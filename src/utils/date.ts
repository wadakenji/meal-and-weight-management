import { endOfDay, format, formatRFC3339, startOfDay, subDays } from 'date-fns';

export const formatDatetimeInputValue = (date: Date) =>
  format(date, 'yyyy-MM-dd') + 'T' + format(date, 'hh:mm');

export const formatDateInputValue = (date: Date) => format(date, 'yyyy-MM-dd');

export const formatToDatetimeColumnValue = (date: Date) => date.toISOString();

export const formatToDateColumnValue = (date: Date) =>
  format(date, 'yyyy-MM-dd');

export const getYesterday = () => {
  const today = new Date();
  return subDays(today, 1);
};

export const getRangeOfDate = (date: Date) => {
  return [startOfDay(date), endOfDay(date)];
};
