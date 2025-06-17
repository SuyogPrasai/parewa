import { formatInTimeZone } from "date-fns-tz";

export default function getFormattedDate(date: Date | string): string {
  const timeZone = "Asia/Kathmandu"; // or whatever your target timezone is
  const inputDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  return formatInTimeZone(inputDate, timeZone, 'yyyy-MM-dd');
}
