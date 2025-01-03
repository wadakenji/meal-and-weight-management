import {
  endOfDay,
  format,
  startOfDay,
  subDays,
  toDate,
  isToday as dateFnsIsToday,
} from 'date-fns';

export const formatDatetimeInputValue = (date: Date) =>
  format(date, 'yyyy-MM-dd') + 'T' + format(date, 'hh:mm');

export const formatDateInputValue = (date: Date) => format(date, 'yyyy-MM-dd');

export const dateInputValueToDate = (value: string): Date =>
  toDate(value + 'T00:00');

export const formatToDatetimeColumnValue = (date: Date) => date.toISOString();

export const formatToDateColumnValue = (date: Date) =>
  format(date, 'yyyy-MM-dd');

export const dateColumnValueToDate = (value: string): Date =>
  toDate(value + 'T00:00');

export const getYesterday = () => {
  const today = new Date();
  return subDays(today, 1);
};

export const getRangeOfDate = (date: Date) => {
  return [startOfDay(date), endOfDay(date)];
};

export const isToday = dateFnsIsToday;
