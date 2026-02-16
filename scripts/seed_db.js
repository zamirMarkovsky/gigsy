// scripts/seed_db.js
// MongoDB Migration Script: Hardcoded Events -> GigsyEvent Schema
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Hardcoded event data (from events.mock.js)
const OLD_EVENTS = [
    {
        id: 101,
        title_he: "המופע החדש",
        title_en: "The New Show",
        artist_he: "התקווה 6",
        artist_en: "Hatikva 6",
        venue_he: "לייב פורום",
        venue_en: "Live Forum",
        city_he: "באר שבע",
        city_en: "Be'er Sheva",
        region: "south",
        date: "2026-03-12",
        time: "21:30",
        price: 159,
        category: "music",
        image: "https://park.co.il/wp-content/uploads/2025/02/hatikva_6_362x876.png",
        description_he: "הלהקה הכי ישראלית שיש במופע מקפיץ עם כל הלהיטים הגדולים.",
        description_en: "The most Israeli band around in an energetic show with all the greatest hits.",
        ticketUrl: "https://www.eventim.co.il/artist/התקווה6"
    },
    {
        id: 201,
        title_he: "ימים טובים",
        title_en: "Good Days",
        artist_he: "משה פרץ",
        artist_en: "Moshe Peretz",
        venue_he: "זאפה הרצליה",
        venue_en: "Zappa Herzliya",
        city_he: "הרצליה",
        city_en: "Herzliya",
        region: "center",
        date: "2026-02-28",
        time: "22:00",
        price: 199,
        category: "music",
        image: "https://www.zappa-club.co.il/obj/media/IL-eventim/teaser/evo/artwork/2026/moshmosh26-artwork.jpeg",
        description_he: "ערב בלתי נשכח עם הבלדות והקצב.",
        description_en: "An unforgettable evening of ballads and rhythm.",
        ticketUrl: "https://www.zappa-club.co.il/artist/משה-פרץ/?affiliate=ZPE"
    },
    {
        id: 202,
        title_he: "ימים טובים",
        title_en: "Good Days",
        artist_he: "משה פרץ",
        artist_en: "Moshe Peretz",
        venue_he: "רידינג 3",
        venue_en: "Reading 3",
        city_he: "תל אביב",
        city_en: "Tel Aviv",
        region: "center",
        date: "2026-03-05",
        time: "21:00",
        price: 180,
        category: "music",
        image: "https://www.zappa-club.co.il/obj/media/IL-eventim/teaser/evo/artwork/2026/moshmosh26-artwork.jpeg",
        description_he: "מופע עמידה מלא אנרגיה.",
        description_en: "Full energy standing show.",
        ticketUrl: "https://www.zappa-club.co.il/artist/משה-פרץ/?affiliate=ZPE"
    },
    {
        id: 301,
        title_he: "מלכת השלג",
        title_en: "The Snow Queen",
        artist_he: "הבלט הישראלי",
        artist_en: "Israeli Ballet",
        venue_he: "המשכן לאומנויות הבמה",
        venue_en: "Performing Arts Center",
        city_he: "תל אביב",
        city_en: "Tel Aviv",
        region: "center",
        date: "2026-04-10",
        time: "11:00",
        price: 119,
        category: "arts",
        image: "https://iballet.co.il/_Uploads/UtilsMedia/WEB_WIDE.jpg",
        description_he: "הפקה בימתית סוחפת לכל המשפחה המבוססת על האגדה הקלאסית.",
        description_en: "A sweeping stage production for the whole family.",
        ticketUrl: "https://www.zappa-club.co.il/artist/israeliballet/מלכת-השלג-הבלט-הישראלי-3905409/?affiliate=ZPE"
    },
    {
        id: 401,
        title_he: "מופע סטנדאפ",
        title_en: "Standup Comedy",
        artist_he: "אדיר מילר",
        artist_en: "Adir Miller",
        venue_he: "גריי יהוד",
        venue_en: "Gray Yahud",
        city_he: "יהוד",
        city_en: "Yahud",
        region: "center",
        date: "2026-03-15",
        time: "21:30",
        price: 139,
        category: "arts",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000&auto=format&fit=crop",
        description_he: "האיש שמאחורי הרמזור מגיע לפרק את המקום מצחוק.",
        description_en: "The man behind Ramzor comes to break the house with laughter.",
        ticketUrl: "https://grayclub.co.il/event/140/8778/"
    },
    {
        id: 402,
        title_he: "הסיבוב החדש",
        title_en: "New Tour",
        artist_he: "רביד פלוטניק",
        artist_en: "Ravid Plotnik",
        venue_he: "גריי עמק חפר",
        venue_en: "Gray Emek Hefer",
        city_he: "עמק חפר",
        city_en: "Emek Hefer",
        region: "north",
        date: "2026-04-02",
        time: "21:00",
        price: 160,
        category: "music",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
        description_he: "נצ'י נצ' במופע להקה מלא עם שירים מכל האלבומים.",
        description_en: "Nechi Nech in a full band show with songs from all albums.",
        ticketUrl: "https://grayclub.co.il/event/57/19055/"
    },
    {
        id: 501,
        title_he: "אולסטאר 2026",
        title_en: "All-Star 2026",
        artist_he: "ליגת ווינר סל",
        artist_en: "Winner League",
        venue_he: "היכל מנורה",
        venue_en: "Menora Arena",
        city_he: "תל אביב",
        city_en: "Tel Aviv",
        region: "center",
        date: "2026-03-24",
        time: "18:00",
        price: 80,
        category: "sports",
        image: "https://s3.eu-central-1.amazonaws.com/yt-s3/c0c2601c-63c3-4383-a1f5-17fc435581b2.png",
        description_he: "הישראלים נגד הזרים, תחרויות הטבעות ושלשות.",
        description_en: "Israelis vs. Foreigners, dunk and 3-point contests.",
        ticketUrl: "https://www.leaan.co.il/special-events/אולסטאר-2026/5347"
    }
];

// Source name mapping (URL -> Brand Name)
const SOURCE_MAP = {
    'eventim.co.il': 'Eventim',
    'zappa-club.co.il': 'Zappa',
    'grayclub.co.il': 'Gray Club',
    'leaan.co.il': 'Leaan'
};

// Transform old event to GigsyEvent schema
function transformEvent(oldEvent) {
    // Extract source name from ticketUrl
    let sourceName = 'Unknown';
    if (oldEvent.ticketUrl) {
        for (const [domain, brand] of Object.entries(SOURCE_MAP)) {
            if (oldEvent.ticketUrl.includes(domain)) {
                sourceName = brand;
                break;
            }
        }
    }

    // Calculate expiration time (StartTime + Duration/2)
    // Default duration: 120 minutes (as per tech_constraints.md Section 6)
    const [hours, minutes] = oldEvent.time.split(':');
    const startTime = new Date(`${oldEvent.date}T${oldEvent.time}:00`);
    const durationMinutes = 120; // Fallback duration
    const expirationTime = new Date(startTime.getTime() + (durationMinutes / 2) * 60 * 1000);

    return {
        // source field (strict schema)
        source: {
            name: sourceName,
            origin_url: oldEvent.ticketUrl || '',
            is_partner: false // Phase 1: All external redirects
        },

        // title field (localized pattern)
        title: {
            original: oldEvent.title_en || oldEvent.title_he,
            en: oldEvent.title_en,
            he: oldEvent.title_he
        },

        // pricing field
        pricing: {
            base_price: Number(oldEvent.price),
            currency: 'ILS'
        },

        // metadata (flexible bucket)
        metadata: {
            artist_en: oldEvent.artist_en,
            artist_he: oldEvent.artist_he,
            venue_en: oldEvent.venue_en,
            venue_he: oldEvent.venue_he,
            city_en: oldEvent.city_en,
            city_he: oldEvent.city_he,
            region: oldEvent.region,
            date: oldEvent.date,
            time: oldEvent.time,
            start_time: startTime.toISOString(),
            expiration_time: expirationTime.toISOString(),
            duration_minutes: durationMinutes,
            category: oldEvent.category,
            image: oldEvent.image,
            description_en: oldEvent.description_en,
            description_he: oldEvent.description_he,
            legacy_id: oldEvent.id // Preserve original ID for reference
        }
    };
}

// Main seed function
async function seedDatabase() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('❌ MONGODB_URI not found in environment variables!');
        process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB Atlas...');
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Connected successfully!');

        const db = client.db('gigsy');
        const eventsCollection = db.collection('events');

        // Clear existing data (fresh start)
        console.log('🧹 Clearing existing events...');
        await eventsCollection.deleteMany({});

        // Transform and insert events
        console.log(`📦 Transforming ${OLD_EVENTS.length} events...`);
        const transformedEvents = OLD_EVENTS.map(transformEvent);

        console.log('💾 Inserting into MongoDB...');
        const result = await eventsCollection.insertMany(transformedEvents);

        console.log(`✅ Successfully inserted ${result.insertedCount} events!`);

        // Verification: Fetch one event
        console.log('\n🔍 Verification: Fetching one event...');
        const sample = await eventsCollection.findOne({});

        if (sample) {
            console.log('\n✨ Sample Event from MongoDB:');
            console.log(JSON.stringify(sample, null, 2));
            console.log(`\n✅ MongoDB _id generated: ${sample._id}`);
        }

    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    } finally {
        await client.close();
        console.log('\n🔌 Connection closed.');
    }
}

// Execute
seedDatabase();
