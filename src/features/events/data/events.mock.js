
import {
    Ticket, Music, Mic, Drama
} from 'lucide-react';

export const events = [
    // --- התקווה 6: םורום לייב, באר שבע ---
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
    // --- משה פרץ: זאפה הרצליה ---
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
    // --- משה פרץ: רידינג 3 ---
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
    // --- הבלט הישראלי ---
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
    // --- אדיר מילר (גריי יהוד) ---
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
    // --- רביד פלוטניק (גריי עמק חפר) ---
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
        region: "north", // נגדיר כצפון/שרון
        date: "2026-04-02",
        time: "21:00",
        price: 160,
        category: "music",
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
        description_he: "נצ'י נצ' במופע להקה מלא עם שירים מכל האלבומים.",
        description_en: "Nechi Nech in a full band show with songs from all albums.",
        ticketUrl: "https://grayclub.co.il/event/57/19055/"
    },
    // --- אולסטאר 2026 ---
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

export const CATEGORIES = [
    { id: 'all', label: 'הכל', icon: Ticket },
    { id: 'music', label: 'מוזיקה', icon: Music },
    { id: 'standup', label: 'סטנדאפ', icon: Mic },
    { id: 'theater', label: 'תיאטרון', icon: Drama },
];
