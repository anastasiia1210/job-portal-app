export class DateService{
    static formatDateTimeToString(dateTime: string): string {
        const formattedDateTime = new Date(dateTime).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        return formattedDateTime.replace(/[\/]/g, '.').replace(',', '');
    }

    static formatDateToString(date: string): string {
        const formattedDateTime = new Date(date).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        return formattedDateTime.replace(/[\/]/g, '.').replace(',', '');
    }
   static getAgeByBirthday(birthday: Date | undefined): number{
       const today = new Date();
       const birthDate = new Date(birthday);

       let age = today.getFullYear() - birthDate.getFullYear();

       if (
           today.getMonth() < birthDate.getMonth() ||
           (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
       ) {
           age--;
       }

       return age;
   }
}
