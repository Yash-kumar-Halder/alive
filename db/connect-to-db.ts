import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}

const cached = global.mongoose ?? {
    conn: null,
    promise: null,
};

global.mongoose = cached;

export async function connectToDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI!, {
            dbName: 'alive',
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
