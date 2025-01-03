import {
  endOfDay,
  format,
  startOfDay,
  subDays,
  toDate,
  isToday as dateFnsIsToday,
} from 'date-fns';

export const dateToDatetimeInputValue = (date: Date) =>
  format(date, 'yyyy-MM-dd') + 'T' + format(date, 'hh:mm');

export const dateToDateInputValue = (date: Date) => format(date, 'yyyy-MM-dd');

export const dateInputValueToDate = (value: string): Date =>
  toDate(value + 'T00:00');

export const dateToDatetimeColumnValue = (date: Date) => date.toISOString();

export const dateToDateColumnValue = (date: Date) => format(date, 'yyyy-MM-dd');

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
