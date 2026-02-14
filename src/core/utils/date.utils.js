
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });
};

export const getDayName = (dateString, locale = 'he-IL') => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { weekday: 'short' });
};

export const formatDateDDMM = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
};
