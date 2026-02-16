// api/events.js - Vercel Serverless Function
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('gigsy');

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { db } = await connectToDatabase();
        const eventsCollection = db.collection('events');
        const now = new Date();

        // Query: Only return events where expiration_time > now
        const events = await eventsCollection
            .find({
                'metadata.expiration_time': { $gt: now.toISOString() }
            })
            .sort({ 'metadata.date': 1 })
            .toArray();

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch events'
        });
    }
}
