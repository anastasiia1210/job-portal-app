export class DateService{
    static formatDateTimeToString(dateTime: string): string {
        const formattedDateTime = new Date(dateTime).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        return formattedDateTime.replace(/[\/]/g, '.').replace(',', ''); // Remove the comma
    }
}
