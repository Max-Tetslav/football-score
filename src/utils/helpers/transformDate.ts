export default function transformDate(date: string): string[] {
  const dateObj = new Date(date);
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

  return [dateObj.toLocaleDateString(), dateObj.toLocaleTimeString('ru-RU', timeOptions)];
}
