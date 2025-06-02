import { formatInTimeZone } from "date-fns-tz";

export default function getFormattedDate(date: Date | string): string {
  const inputDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  return inputDate.toISOString().split('T')[0];
}