import { DateType } from "../../types/types.ts";
const today = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
export const getParseDate = (date: string) => {
  return Math.floor(Date.parse(date) / (24 * 60 * 60 * 1000));
};
export const getToday = () => today;
export const getTomorrow = () => today + 1;
export const getMinValueFromArray = (array: number[] | undefined): number => {
  if (array === undefined) throw new Error("Input array is undefined");
  return Math.min(...array);
};

export const getMaxValueFromArray = (array: number[] | undefined): number => {
  if (array === undefined) throw new Error("Input array is undefined");
  return Math.max(...array);
};

export const formatDate = (inputDate: DateType) => {
  const startDate = new Date(inputDate.start_date);
  const endDate = new Date(inputDate.end_date);

  const startDay = startDate.getDate();
  const startMonth = getMonthAbbreviation(startDate.getMonth());

  const endDay = endDate.getDate();
  const endMonth = getMonthAbbreviation(endDate.getMonth());

  return `${startDay}.${startMonth} - ${endDay}.${endMonth}`;
};

const getMonthAbbreviation = (monthIndex: number) => {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  return months[monthIndex];
};
