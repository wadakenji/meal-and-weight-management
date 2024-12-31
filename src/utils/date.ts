import { format, formatRFC3339, subDays } from 'date-fns';

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
