// src/hooks/useEvents.ts
import { useState, useEffect } from 'react';

interface UseEventsReturn {
    events: any[];
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch events from the API
 * Replaces hardcoded event data with live MongoDB data
 */
export function useEvents(): UseEventsReturn {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                // Use relative URL - Vite proxy will forward to localhost:3001
                const response = await fetch('/api/events');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    // Transform MongoDB events back to frontend format
                    const transformedEvents = result.data.map((event: any) => ({
                        id: event.metadata.legacy_id,
                        title_he: event.title.he,
                        title_en: event.title.en,
                        artist_he: event.metadata.artist_he,
                        artist_en: event.metadata.artist_en,
                        venue_he: event.metadata.venue_he,
                        venue_en: event.metadata.venue_en,
                        city_he: event.metadata.city_he,
                        city_en: event.metadata.city_en,
                        region: event.metadata.region,
                        date: event.metadata.date,
                        time: event.metadata.time,
                        price: event.pricing.base_price,
                        category: event.metadata.category,
                        image: event.metadata.image,
                        description_he: event.metadata.description_he,
                        description_en: event.metadata.description_en,
                        ticketUrl: event.source.origin_url
                    }));

                    setEvents(transformedEvents);
                } else {
                    throw new Error('API returned unsuccessful response');
                }
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch events');
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    return { events, loading, error };
}
