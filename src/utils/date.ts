import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const datePairs = (end: Date, start?: Date, splits: Date[] = []) => {
  const dates = [start, ...splits, end]
    .filter(Boolean) // Remove undefined
    .sort((a, b) => a.getTime() - b.getTime());

  // Chunk dates into pairs
  return dates.reduce((acc, date, index) => {
    if (index % 2 === 0) {
      acc.push([date, dates[index + 1]]);
    }
    return acc;
  }, [] as [Date, Date][]);
};

export const distance = (end: Date, start?: Date, splits: Date[] = []) => {
  const pairs = datePairs(end, start, splits);

  const distances = pairs.map(([start, end]) => {
    return dayjs(start).diff(dayjs(end), "second");
  });

  return distances.reduce((acc, distance) => acc + distance, 0);
};

export interface WorkHoursConfig {
  startMinutes: number; // e.g. 480 = 08:00
  endMinutes: number; // e.g. 990 = 16:30
}

const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

const minuteOfDay = (d: Date) => d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;

const setMinuteOfDay = (d: Date, minutes: number) => {
  const result = new Date(d);
  result.setHours(Math.floor(minutes / 60), Math.floor(minutes % 60), Math.round((minutes % 1) * 60), 0);
  return result;
};

const nextWeekday = (d: Date) => {
  const result = new Date(d);
  do {
    result.setDate(result.getDate() + 1);
  } while (isWeekend(result));
  return result;
};

const prevWeekday = (d: Date) => {
  const result = new Date(d);
  do {
    result.setDate(result.getDate() - 1);
  } while (isWeekend(result));
  return result;
};

/** Clamp a date forward to the next working moment */
const clampForward = (d: Date, config: WorkHoursConfig): Date => {
  let result = new Date(d);
  // Skip weekends
  if (isWeekend(result)) {
    result = nextWeekday(result);
    result = setMinuteOfDay(result, config.startMinutes);
    return result;
  }
  const mod = minuteOfDay(result);
  if (mod < config.startMinutes) {
    return setMinuteOfDay(result, config.startMinutes);
  }
  if (mod >= config.endMinutes) {
    result = nextWeekday(result);
    return setMinuteOfDay(result, config.startMinutes);
  }
  return result;
};

/** Clamp a date backward to the previous working moment */
const clampBackward = (d: Date, config: WorkHoursConfig): Date => {
  let result = new Date(d);
  // Skip weekends
  if (isWeekend(result)) {
    result = prevWeekday(result);
    result = setMinuteOfDay(result, config.endMinutes);
    return result;
  }
  const mod = minuteOfDay(result);
  if (mod >= config.endMinutes) {
    return setMinuteOfDay(result, config.endMinutes);
  }
  if (mod < config.startMinutes) {
    result = prevWeekday(result);
    return setMinuteOfDay(result, config.endMinutes);
  }
  return result;
};

/** Count weekdays between two dates (exclusive of both endpoints' dates) */
const countWeekdaysBetween = (a: Date, b: Date): number => {
  let count = 0;
  const cursor = new Date(a);
  cursor.setDate(cursor.getDate() + 1);
  cursor.setHours(0, 0, 0, 0);

  const bDay = new Date(b);
  bDay.setHours(0, 0, 0, 0);

  while (cursor < bDay) {
    if (!isWeekend(cursor)) {
      count++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
};

const workingSecondsBetween = (a: Date, b: Date, config: WorkHoursConfig): number => {
  const cA = clampForward(a, config);
  const cB = clampBackward(b, config);

  if (cA >= cB) return 0;

  const workdaySeconds = (config.endMinutes - config.startMinutes) * 60;

  // Same calendar day
  if (
    cA.getFullYear() === cB.getFullYear() &&
    cA.getMonth() === cB.getMonth() &&
    cA.getDate() === cB.getDate()
  ) {
    return (cB.getTime() - cA.getTime()) / 1000;
  }

  // Multi-day
  const firstDayEnd = setMinuteOfDay(cA, config.endMinutes);
  const firstDaySeconds = (firstDayEnd.getTime() - cA.getTime()) / 1000;

  const lastDayStart = setMinuteOfDay(cB, config.startMinutes);
  const lastDaySeconds = (cB.getTime() - lastDayStart.getTime()) / 1000;

  const intermediateWeekdays = countWeekdaysBetween(cA, cB);
  const intermediateSeconds = intermediateWeekdays * workdaySeconds;

  return firstDaySeconds + intermediateSeconds + lastDaySeconds;
};

export const workingDistance = (
  end: Date,
  start: Date | undefined,
  splits: Date[],
  config: WorkHoursConfig,
) => {
  const pairs = datePairs(end, start, splits);

  const distances = pairs.map(([a, b]) => {
    const resolvedB = b ?? new Date();
    if (a <= resolvedB) {
      return -workingSecondsBetween(a, resolvedB, config);
    }
    return workingSecondsBetween(resolvedB, a, config);
  });

  return distances.reduce((acc, d) => acc + d, 0);
};
