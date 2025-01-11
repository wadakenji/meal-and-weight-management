import {
  endOfDay,
  format,
  startOfDay,
  subDays,
  toDate,
  isToday as dateFnsIsToday,
  isYesterday as dateFnsIsYesterday,
  isValid,
  subMonths,
  eachDayOfInterval,
  differenceInCalendarDays,
} from 'date-fns';

export const dateToMonthDateString = (date: Date) => format(date, 'M/d');

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

export const getOneMonthAgoDate = (date: Date = new Date()) => {
  return subMonths(date, 1);
};

export const getRangeOfDate = (date: Date) => {
  return [startOfDay(date), endOfDay(date)];
};

export const getEachDates = (start: Date, end: Date) =>
  eachDayOfInterval({ start, end });

export const getDateDiff = (earlier: Date, later: Date) =>
  differenceInCalendarDays(later, earlier);

export const isToday = dateFnsIsToday;
export const isYesterday = dateFnsIsYesterday;

export const isValidDate = isValid;
