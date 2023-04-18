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

const workDayStart = 8;
const workDayEnd = 17;

export const secondsSince = (
  date: Date,
  durationType: "all" | "workHours" = "all"
) => {
  const now = new Date();
  if (durationType === "all") {
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    return seconds;
  } else {
    console.time("secondsSince");
    let count = 0;
    // timestamp in seconds
    let current = Math.floor(new Date(now).getTime() / 1000);
    const end = Math.floor(new Date(date).getTime() / 1000);
    while (current < end) {
      const date = new Date(current * 1000);

      if (
        date.getDay() !== 0 &&
        date.getDay() !== 6 &&
        date.getHours() >= workDayStart &&
        date.getHours() < workDayEnd
      ) {
        count++;
      }
      current++;
    }
    console.timeEnd("secondsSince");
    console.log(count);
    return count;
  }
};
