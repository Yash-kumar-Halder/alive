import mongoose, { Model, Types } from 'mongoose';

export interface UserDocument extends mongoose.Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    image?: string;
    authProvider: 'google' | 'github';
    authProviderId: string;
    workspaces: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        authProvider: {
            type: String,
            enum: ['google', 'github'],
            required: true,
        },
        authProviderId: {
            type: String,
            required: true,
            unique: true,
        },
        workspaces: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Workspace',
            },
        ],
    },
    { timestamps: true }
);

const UserModel =
    (mongoose.models.User as Model<UserDocument>) ||
    mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
