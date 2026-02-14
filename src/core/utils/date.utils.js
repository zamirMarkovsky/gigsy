
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });
};

export const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { weekday: 'long' });
};
