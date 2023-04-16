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

export const secondsSince = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  return seconds;
};
