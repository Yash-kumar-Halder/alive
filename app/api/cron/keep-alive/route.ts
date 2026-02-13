import { NextResponse } from 'next/server';
import { connectToDB } from '@/db/connect-to-db';
import ProjectModel from '@/models/project.model';

export async function GET() {
    try {
        await connectToDB();

        const now = new Date();

        const projects = await ProjectModel.find({
            keepAliveEnabled: true,
            keepAliveUrl: { $exists: true, $ne: null },
            isArchived: false,
        });

        for (const project of projects) {
            try {
                const res = await fetch(project.keepAliveUrl!, {
                    method: 'GET',
                });

                await ProjectModel.findByIdAndUpdate(project._id, {
                    lastPingAt: now,
                    lastPingStatus: res.status,
                    lastPingError: null,
                });
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error ? error.message : 'Unknown error occured';

                await ProjectModel.findByIdAndUpdate(project._id, {
                    lastPingAt: now,
                    lastPingStatus: null,
                    lastPingError: errorMessage,
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Cron failed' }, { status: 500 });
    }
}
