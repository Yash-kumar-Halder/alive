import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/db/connect-to-db';
import ProjectModel from '@/models/project.model';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

// ---------------- GET ALL PROJECTS ----------------

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const workspaceId = searchParams.get('workspaceId');

        if (!workspaceId || !mongoose.Types.ObjectId.isValid(workspaceId)) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Valid workspaceId is required',
                },
                { status: 400 }
            );
        }

        const projects = await ProjectModel.find({
            workspace: workspaceId,
            isArchived: false,
        })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json<ApiResponse<typeof projects>>(
            {
                success: true,
                data: projects,
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                message: 'Failed to fetch projects',
            },
            { status: 500 }
        );
    }
}

// ---------------- CREATE PROJECT ----------------

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();

        const { name, description, workspace, keepAliveUrl, keepAliveEnabled, keepAliveInterval } =
            body;

        if (!name || !workspace) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Name and workspace are required',
                },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(workspace)) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Invalid workspace ID',
                },
                { status: 400 }
            );
        }

        const project = await ProjectModel.create({
            name,
            description,
            workspace,
            createdBy: 'USER_ID_FROM_AUTH', // Replace with real session.user.id
            members: [
                {
                    user: 'USER_ID_FROM_AUTH',
                    role: 'owner',
                },
            ],
            keepAliveUrl,
            keepAliveEnabled: !!keepAliveUrl && keepAliveEnabled,
            keepAliveInterval,
        });

        return NextResponse.json<ApiResponse<typeof project>>(
            {
                success: true,
                message: 'Project created successfully',
                data: project,
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                message: 'Failed to create project',
            },
            { status: 500 }
        );
    }
}
