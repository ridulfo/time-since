import dayjs from "dayjs";

const pad = (n: number) => (n < 10 ? `0${n}` : n);
/** Takes a number of seconds and returns a string containing how many
 * days, hours, minutes and seconds that is. */
export const formatDuration = (seconds: number) => {
  const absSeconds = Math.abs(seconds);
  const days = Math.floor(absSeconds / 86400);
  const hours = Math.floor((absSeconds % 86400) / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const secs = absSeconds % 60;

  // if the unit above is greater than 0, we want to show it
  return [
    days > 0 ? `${pad(days)}d` : "",
    hours > 0 || days > 0 ? `${pad(hours)}h` : "",
    minutes > 0 || hours > 0 || days > 0 ? `${pad(minutes)}m` : "",
    `${pad(secs)}s`,
  ].join(" ");
};

export const dateFormat = (date: Date) => dayjs(date).format("YYYYMMDD-HHmmss");
export const dateFormatDatetimeLocale = (date: Date) => dayjs(date).format("YYYY-MM-DDTHH:mm");

export const parseHHMM = (s: string): number => {
  return parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(2, 4));
};

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
