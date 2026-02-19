// app/api/workspaces/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/db/connect-to-db';
import WorkspaceModel from '@/models/workspace.model';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authConfig } from '../auth/[...nextauth]/options';

/* ======================================================
   GET - Get all workspaces for authenticated user
====================================================== */
export async function GET() {
    try {
        const session = await getServerSession(authConfig);

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDB();

        const workspaces = await WorkspaceModel.find({
            'members.user': new mongoose.Types.ObjectId(session.user.id),
            isArchived: false,
        })
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(
            {
                success: true,
                data: workspaces,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET_WORKSPACES_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

/* ======================================================
   POST - Create new workspace
====================================================== */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authConfig);

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, description } = body;

        /* ---------------- Validation ---------------- */

        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return NextResponse.json(
                { message: 'Workspace name must be at least 2 characters long' },
                { status: 400 }
            );
        }

        await connectToDB();

        const userId = new mongoose.Types.ObjectId(session.user.id);

        /* ---------------- Optional: Prevent duplicate workspace names per user ---------------- */

        const existingWorkspace = await WorkspaceModel.findOne({
            name: name.trim(),
            'members.user': userId,
            isArchived: false,
        });

        if (existingWorkspace) {
            return NextResponse.json(
                { message: 'Workspace with this name already exists' },
                { status: 409 }
            );
        }

        /* ---------------- Create Workspace ---------------- */

        const workspace = await WorkspaceModel.create({
            name: name.trim(),
            description: description?.trim() || '',
            createdBy: userId,
            members: [
                {
                    user: userId,
                    role: 'owner',
                },
            ],
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Workspace created successfully',
                data: workspace,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('CREATE_WORKSPACE_ERROR:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
