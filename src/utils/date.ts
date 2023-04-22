import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const distance = (end: Date, start?: Date) => {
  const startDate = dayjs(start) || dayjs();
  const endDate = dayjs(end);
  return endDate.diff(start, "second");
};
