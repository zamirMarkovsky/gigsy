/* eslint-disable */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Missing VITE_GEMINI_API_KEY in environment variables. AI features will not work.");
}

export const generateGeminiContent = async (prompt, isJson = false) => {
    if (!API_KEY) {
        console.error("No API Key available.");
        return null;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    if (isJson) {
        payload.generationConfig = { responseMimeType: "application/json" };
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("API Call Failed");

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
};


export const getArtistBio = async (artist, language = 'en') => {
    const langInstruction = language === 'he' ? 'in Hebrew' : 'in English';
    const prompt = `Write a short, engaging summary paragraph about the artist/performer "${artist}" ${langInstruction}. Keep it concise (max 3-4 sentences).`;
    return await generateGeminiContent(prompt, false);
};

export const getNightPlan = async (event, city, time, language = 'en') => {
    // Calculate 2 hours before event time
    const [hours, minutes] = time.split(':');
    const eventDate = new Date();
    eventDate.setHours(parseInt(hours), parseInt(minutes));
    eventDate.setHours(eventDate.getHours() - 2);
    const dinnerTime = eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const langInstruction = language === 'he' ? 'Hebrew' : 'English';

    // Request JSON structure
    const prompt = `Suggest a specific, highly-rated restaurant in ${city} near the venue of "${event}" that would be perfect for dinner at ${dinnerTime} (2 hours before the show at ${time}). 
    Return a valid JSON object with the following fields: 
    - "name": Name of the restaurant
    - "cuisine": Type of cuisine
    - "reason": A brief reason why it's a good matching choice (written in ${langInstruction})
    - "searchQuery": The name of the restaurant and city for Google Maps search
    - "travelTime": Estimated time to get from the restaurant to the event venue (e.g. "5 min walk" or "10 min drive")
    Do not include markdown formatting like \`\`\`json. Just the raw JSON object.`;

    return await generateGeminiContent(prompt, true);
};
