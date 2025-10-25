export function calculateReadingTime(text: string | null | undefined, wpm: number = 200): number {
    if (!text) {
        return 0;
    }
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
}

export const formatDateForInput = (date: Date | string | number | null | undefined): string => {
    if (!date) {
        return '';
    }
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            console.warn('Invalid date provided to formatDateForInput:', date);
            return '';
        }
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error formatting date:', error, 'Input:', date);
        return '';
    }
};