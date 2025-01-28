import mongoose, { Connection } from 'mongoose';

// Add this type declaration at the top
declare global {
    var mongoose: { conn: Connection | null; promise: Promise<Connection> | null } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

let cached = global.mongoose;

async function dbConnect(): Promise<Connection> {
    if (!cached) {
        cached = global.mongoose = { conn: null, promise: null };
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect; 