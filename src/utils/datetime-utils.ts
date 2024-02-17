export function formatDateToMonthYear(date: Date, locale: string = 'default'): string {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    return formatter.format(date);
}

//convert date to YYYY-MM-DD hh:mm:ss
export function formatDateToDateTime(date: Date | string): string {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
}