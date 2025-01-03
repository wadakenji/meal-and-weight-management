import {
  endOfDay,
  format,
  startOfDay,
  subDays,
  toDate,
  isToday as dateFnsIsToday,
  isYesterday as dateFnsIsYesterday,
  isValid,
} from 'date-fns';

export const dateToDatetimeInputValue = (date: Date) =>
  format(date, 'yyyy-MM-dd') + 'T' + format(date, 'HH:mm');

export const datetimeInputValueToDate = (value: string) => toDate(value);

export const dateToDateInputValue = (date: Date) => format(date, 'yyyy-MM-dd');

export const dateInputValueToDate = (value: string): Date =>
  toDate(value + 'T00:00');

export const dateToDatetimeColumnValue = (date: Date) => date.toISOString();

export const datetimeColumnValueToDate = (value: string): Date => toDate(value);

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
export const isYesterday = dateFnsIsYesterday;

export const isValidDate = isValid;
