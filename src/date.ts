import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

/** Takes a number of seconds and returns a string containing how many
 * hours, minutes and seconds that is. */
export const formatDuration = (seconds: number) => {
  const absSeconds = Math.abs(seconds);
  const hours = Math.floor(absSeconds / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const secs = absSeconds % 60;

  const hoursString = hours > 0 ? `${hours}h ` : "";
  const minutesString = minutes > 0 ? `${minutes}m ` : "";
  const secondsString = secs > 0 ? `${secs}s` : "";

  return hoursString + minutesString + secondsString;
};

export const secondsSince = (
  datetime: Date,
  workHours?: { start: string; end: string }
) => {
  const now =  dayjs();
  const date = dayjs(datetime);
  if (!workHours) {
    return date.diff(now, "second");
  }

  const workDayStartHour = parseInt(workHours?.start.split(":")[0]);
  const workDayStartMinute = parseInt(workHours?.start.split(":")[1]);
  const workDayEndHour = parseInt(workHours?.end.split(":")[0]);
  const workDayEndMinute = parseInt(workHours?.end.split(":")[1]);

  let seconds = 0;

  const todayStart = dayjs(now)
    .hour(workDayStartHour)
    .minute(workDayStartMinute)
    .second(0);
  const todayEnd = dayjs(now)
    .hour(workDayEndHour)
    .minute(workDayEndMinute)
    .second(0);
  if (
    now.day() !== 0 &&
    now.day() !== 6 &&
    now.isBetween(todayStart.add(-1, "minute"), todayEnd.add(1, "minute"))
  ) {
    seconds += todayEnd.diff(now, "second");
  }

  const dateStart = dayjs(date)
    .hour(workDayStartHour)
    .minute(workDayStartMinute)
    .second(0);
  const dateEnd = dayjs(date)
    .hour(workDayEndHour)
    .minute(workDayEndMinute)
    .second(0);

  if (
    now.day() !== 0 &&
    now.day() !== 6 &&
    date.isBetween(dateStart.add(-1, "minutes"), dateEnd.add(1, "minutes"))
  ) {
    seconds += dateStart.diff(date, "second");
  }

  // count number of work days between now and date
  let current = dayjs(now);
  current = current.add(1, "day");
  let countWorkDays = 0;
  while (current.isBefore(date)) {
    if (current.day() !== 0 && current.day() !== 6) {
      countWorkDays++;
    }
    current = current.add(1, "day");
  }

  seconds += countWorkDays * dateStart.diff(dateEnd, "seconds");

  return seconds;
};
