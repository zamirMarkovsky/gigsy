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

export const getArtistBio = async (artist, title) => {
    const prompt = `Bio for ${artist}`;
    return await generateGeminiContent(prompt, false);
};

export const getNightPlan = async (event, city, time) => {
    const prompt = `Plan for ${event}`;
    return await generateGeminiContent(prompt, true);
};
