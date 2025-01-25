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
import { tz } from '@date-fns/tz';

type DateFunctionOptions = {
  timezone?: string;
};

const optionsToTz = (options: DateFunctionOptions | undefined) =>
  typeof options?.timezone === 'string' ? tz(options.timezone) : undefined;

export const dateToMonthDateString = (
  date: Date,
  options?: DateFunctionOptions,
) => format(date, 'M/d', { in: optionsToTz(options) });

export const dateToDatetimeInputValue = (
  date: Date,
  options?: DateFunctionOptions,
) => {
  const tz = optionsToTz(options);
  return `${format(date, 'yyyy-MM-dd', { in: tz })}T${format(date, 'HH:mm', { in: tz })}`;
};

export const dateToDateInputValue = (
  date: Date,
  options?: DateFunctionOptions,
) => format(date, 'yyyy-MM-dd', { in: optionsToTz(options) });

export const dateToDatetimeColumnValue = (date: Date) => date.toISOString();

export const datetimeColumnValueToDate = (value: string): Date => toDate(value);

export const dateToDateColumnValue = (
  date: Date,
  options?: DateFunctionOptions,
) => format(date, 'yyyy-MM-dd', { in: optionsToTz(options) });

export const dateStringToDate = (
  value: string,
  options?: DateFunctionOptions,
): Date => toDate(`${value}T00:00:00${options?.timezone || ''}`);

/**
 * 日付を表す文字列（yyyy-MM-dd）をシステムのタイムゾーンにおけるその日付の0時を表すDateオブジェクトに変換する
 */
export const dateStringToLocalTimezoneDate = (value: string): Date =>
  toDate(value + 'T00:00');

export const getYesterday = () => {
  const today = new Date();
  return subDays(today, 1);
};

export const getOneMonthAgoDate = (date: Date = new Date()) => {
  return subMonths(date, 1);
};

export const getRangeOfDate = (date: Date, options?: DateFunctionOptions) => {
  return [
    startOfDay(date, { in: optionsToTz(options) }),
    endOfDay(date, { in: optionsToTz(options) }),
  ];
};

export const getEachDates = (
  start: Date,
  end: Date,
  options?: DateFunctionOptions,
) => eachDayOfInterval({ start, end }, { in: optionsToTz(options) });

export const getDateDiff = (
  earlier: Date,
  later: Date,
  options?: DateFunctionOptions,
) => differenceInCalendarDays(later, earlier, { in: optionsToTz(options) });

export const isToday = (date: Date, options?: DateFunctionOptions) =>
  dateFnsIsToday(date, { in: optionsToTz(options) });
export const isYesterday = (date: Date, options?: DateFunctionOptions) =>
  dateFnsIsYesterday(date, { in: optionsToTz(options) });

export const isValidDate = isValid;
