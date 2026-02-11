import mongoose, { Schema, Types, Model } from 'mongoose';

/* ======================================================
   Workspace Member Types
====================================================== */

export type WorkspaceRole = 'owner' | 'admin' | 'member';

export interface WorkspaceMember {
    user: Types.ObjectId;
    role: WorkspaceRole;
    joinedAt: Date;
}

/* ======================================================
   Workspace Interface
====================================================== */

export interface Workspace {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    members: WorkspaceMember[];
    createdBy: Types.ObjectId;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/* ======================================================
   Mongoose Schema
====================================================== */

const WorkspaceMemberSchema = new Schema<WorkspaceMember>(
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

const WorkspaceSchema = new Schema<Workspace>(
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
            type: [WorkspaceMemberSchema],
            default: [],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/* ======================================================
   Indexes (Important for performance)
====================================================== */

// Fast lookup: get all workspaces for a user
WorkspaceSchema.index({ 'members.user': 1 });

// Optional: name search
WorkspaceSchema.index({ name: 'text' });

/* ======================================================
   Safe Model Export (prevents overwrite errors in dev)
====================================================== */

const WorkspaceModel: Model<Workspace> =
    mongoose.models.Workspace || mongoose.model<Workspace>('Workspace', WorkspaceSchema);

export default WorkspaceModel;
