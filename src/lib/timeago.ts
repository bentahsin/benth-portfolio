import { format, register, type LocaleFunc } from 'timeago.js';

const localeFunc: LocaleFunc = (index): [string, string] => {
    const periods: [string, string][] = [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde']
    ];

    const safeIndex = index >= 0 && index < periods.length ? index : 1;
    return periods[safeIndex];
};

try {
    register('tr', localeFunc);
} catch (e) {
    if (!(e instanceof Error && e.message.includes('already registered'))) {
        console.error('Failed to register timeago locale:', e);
    }
}

export const formatTimeAgo = (date: Date | number | string | null | undefined): string => {
    if (!date) {
        return '-';
    }
    try {
        return format(date, 'tr');
    } catch (error) {
        console.error('Error formatting time ago:', error, 'Input date:', date);
        return '-';
    }
};