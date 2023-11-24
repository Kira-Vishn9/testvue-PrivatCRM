import { getToday, getParseDate } from "../untils/helpers/helpers.ts";
import { type DataJSONType, ProcessedData } from "../types/types.ts";

const getStatusStartDiets = (data: DataJSONType[]): ProcessedData[] => {
  return data
    .map((items) => {
      const computedArray: number[] = items.dates
        .filter((item) => getParseDate(item.start_date) - getToday() > 0)
        .map((item) => getParseDate(item.start_date) - getToday());

      return computedArray.length > 0 ? { ...items, computedArray } : undefined;
    })
    .filter(Boolean) as ProcessedData[];
};

const getStatusEndDiets = (data: DataJSONType[]): ProcessedData[] => {
  return data
    .map((items) => {
      const computedArray: number[] = items.dates
        .filter((item) => getParseDate(item.end_date) - getToday() > 0)
        .map((item) => getParseDate(item.end_date) - getToday());

      return computedArray.length > 0 ? { ...items, computedArray } : undefined;
    })
    .filter(Boolean) as ProcessedData[];
};

const getStatusEndDietsAgo = (data: DataJSONType[]): ProcessedData[] => {
  return data
    .map((items) => {
      const computedArray: number[] = items.dates
        .filter((item) => getParseDate(item.end_date) - getToday() < 0)
        .map((item) => Math.abs(getParseDate(item.end_date) - getToday()));

      return computedArray.length > 0 ? { ...items, computedArray } : undefined;
    })
    .filter(Boolean) as ProcessedData[];
};

// так как разница между функциями незначительная то можно сделать одну общую добавив 1 аргумент
// но тогда читаблеьность становиться чуть тяжелее
const getStatusDiets = (
  data: DataJSONType[],
  condition: "start" | "end" | "endAgo",
) => {
  return data
    .map((items) => {
      const objectComputedValues: ProcessedData = { ...items };
      const computedArray: number[] = [];
      items.dates.forEach((item) => {
        const startDate = getParseDate(item.start_date);
        const endDate = getParseDate(item.end_date);
        const today = getToday();
        let different;

        switch (condition) {
          case "start":
            different = startDate - today;
            break;
          case "end":
            different = endDate - today;
            break;
          case "endAgo":
            different = endDate - today;
            if (different < 0) {
              computedArray.push(Math.abs(different));
            }
            break;
          default:
            break;
        }

        if (different && different > 0) {
          computedArray.push(different);
        }
      });

      computedArray.length
        ? (objectComputedValues.computedArray = computedArray)
        : "";

      return objectComputedValues;
    })
    .filter((item) => item.computedArray !== undefined);
};

export default {
  getStatusStartDiets,
  getStatusEndDiets,
  getStatusEndDietsAgo,
  getStatusDiets,
};
