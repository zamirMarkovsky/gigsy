// scripts/patch_categories.js
// Patches event categories in MongoDB: arts -> theater / standup
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

async function patchCategories() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ MONGODB_URI not found!');
        process.exit(1);
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const col = client.db('gigsy').collection('events');

        // Israeli Ballet (id 301): arts -> theater
        const r1 = await col.updateOne(
            { 'metadata.legacy_id': 301 },
            { $set: { 'metadata.category': 'theater' } }
        );
        console.log(`🎭 Israeli Ballet (301): matched=${r1.matchedCount}, modified=${r1.modifiedCount}`);

        // Adir Miller (id 401): arts -> standup
        const r2 = await col.updateOne(
            { 'metadata.legacy_id': 401 },
            { $set: { 'metadata.category': 'standup' } }
        );
        console.log(`🎤 Adir Miller (401): matched=${r2.matchedCount}, modified=${r2.modifiedCount}`);

        console.log('\n✅ Patch complete!');
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

patchCategories();
