import dayjs from "dayjs";

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

export const dateFormat = (date: Date) => dayjs(date).format("YYYYMMDD-HHmmss");

export const dateFromFormat = (date: string) => {
  // return datejs(date, "YYYYMMDD-HHmmss") did not work
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6));
  const day = parseInt(date.slice(6, 8));
  const hour = parseInt(date.slice(9, 11));
  const minute = parseInt(date.slice(11, 13));
  const second = parseInt(date.slice(13, 15));
  return new Date(year, month - 1, day, hour, minute, second);
};
