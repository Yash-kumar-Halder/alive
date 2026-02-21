import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/db/connect-to-db';
import ProjectModel from '@/models/project.model';

interface Params {
    params: {
        projectId: string;
    };
}

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

// ---------------- GET SINGLE PROJECT ----------------

export async function GET(req: NextRequest, { params }: Params) {
    try {
        await connectToDB();

        const { projectId } = params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Invalid project ID',
                },
                { status: 400 }
            );
        }

        const project = await ProjectModel.findById(projectId);

        if (!project || project.isArchived) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Project not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json<ApiResponse<typeof project>>(
            {
                success: true,
                data: project,
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                message: 'Failed to fetch project',
            },
            { status: 500 }
        );
    }
}

// ---------------- UPDATE PROJECT ----------------

export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        await connectToDB();

        const { projectId } = params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Invalid project ID',
                },
                { status: 400 }
            );
        }

        const body = await req.json();

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            projectId,
            { ...body },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Project not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json<ApiResponse<typeof updatedProject>>(
            {
                success: true,
                message: 'Project updated successfully',
                data: updatedProject,
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                message: 'Failed to update project',
            },
            { status: 500 }
        );
    }
}

// ---------------- ARCHIVE PROJECT ----------------

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        await connectToDB();

        const { projectId } = params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Invalid project ID',
                },
                { status: 400 }
            );
        }

        const archived = await ProjectModel.findByIdAndUpdate(
            projectId,
            { isArchived: true },
            { new: true }
        );

        if (!archived) {
            return NextResponse.json<ApiResponse<null>>(
                {
                    success: false,
                    message: 'Project not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json<ApiResponse<null>>(
            {
                success: true,
                message: 'Project archived successfully',
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                message: 'Failed to archive project',
            },
            { status: 500 }
        );
    }
}
