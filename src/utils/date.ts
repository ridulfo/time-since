import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { dateFormat } from "./dateformat";
dayjs.extend(isBetween);

export const distance = (end: Date, start?: Date, splits: Date[] = []) => {
  const dates = [start, ...splits, end]
    .filter(Boolean) // Remove undefined
    .sort((a, b) => a.getTime() - b.getTime());

  // Chunk dates into pairs
  const pairs = dates.reduce((acc, date, index) => {
    if (index % 2 === 0) {
      acc.push([date, dates[index + 1]]);
    }
    return acc;
  }, [] as [Date, Date][]);

  // Calculate distance between each pair
  const distances = pairs.map(([start, end]) => {
    return dayjs(start).diff(dayjs(end), "second");
  });

  const sum = distances.reduce((acc, distance) => acc + distance, 0);
  return sum;
};
