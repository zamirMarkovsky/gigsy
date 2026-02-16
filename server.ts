// server.ts - Express API Server for Gigsy
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true
}));

app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables!');
    process.exit(1);
}

let db: any;
const client = new MongoClient(MONGODB_URI);

// Initialize MongoDB connection
async function connectDB() {
    try {
        await client.connect();
        db = client.db('gigsy');
        console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// API Routes

/**
 * GET /api/events
 * Returns all active events (not yet expired)
 * Sorted by date ascending
 */
app.get('/api/events', async (req, res) => {
    try {
        const eventsCollection = db.collection('events');
        const now = new Date();

        // Query: Only return events where expiration_time > now
        const events = await eventsCollection
            .find({
                'metadata.expiration_time': { $gt: now.toISOString() }
            })
            .sort({ 'metadata.date': 1 }) // Sort by date ascending
            .toArray();

        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error('❌ Error fetching events:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch events'
        });
    }
});

/**
 * GET /api/events/:id
 * Returns a single event by MongoDB _id
 */
app.get('/api/events/:id', async (req, res) => {
    try {
        const eventsCollection = db.collection('events');
        const { id } = req.params;

        const event = await eventsCollection.findOne({ 'metadata.legacy_id': parseInt(id) });

        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        res.json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error('❌ Error fetching event:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch event'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📡 API ready at http://localhost:${PORT}/api/events`);
    });
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n👋 Shutting down gracefully...');
    await client.close();
    process.exit(0);
});
