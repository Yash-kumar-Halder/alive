import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type KeepAliveInterval = 30 | 60;

export type ProjectRole = 'owner' | 'admin' | 'member';

export interface ProjectMember {
    user: Types.ObjectId;
    role: ProjectRole;
    joinedAt: Date;
}

export interface IProject extends Document {
    name: string;
    description?: string;
    members: ProjectMember[];
    workspace: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;

    // Keep Alive Config
    keepAliveUrl?: string;
    keepAliveEnabled: boolean;
    keepAliveInterval?: KeepAliveInterval;
    lastPingAt?: Date;
    lastPingStatus?: number;
    lastPingError?: string;

    isArchived: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const ProjectMemberSchema = new Schema<ProjectMember>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        role: {
            type: String,
            enum: ['owner', 'admin', 'member'],
            default: 'member',
            required: true,
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const ProjectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        members: {
            type: [ProjectMemberSchema],
            default: [],
        },

        workspace: {
            type: Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true,
            index: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // ---------------- Keep Alive ----------------

        keepAliveUrl: {
            type: String,
            trim: true,
        },

        keepAliveEnabled: {
            type: Boolean,
            default: false,
        },

        keepAliveInterval: {
            type: Number,
            enum: [30, 60],
            default: 60,
        },

        lastPingAt: {
            type: Date,
        },

        lastPingStatus: {
            type: Number,
        },

        lastPingError: {
            type: String,
        },

        // ---------------- Soft Delete ----------------

        isArchived: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for fast querying
ProjectSchema.index({ workspace: 1, isArchived: 1 });
ProjectSchema.index({ keepAliveEnabled: 1 });

const ProjectModel: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default ProjectModel;
