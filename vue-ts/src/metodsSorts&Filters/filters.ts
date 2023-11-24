import {
  getToday,
  getParseDate,
  getTomorrow,
} from "../untils/helpers/helpers.ts";
import { type DataJSONType, ProcessedData } from "../types/types.ts";
const getStatusStartToday = (data: DataJSONType[]) => {
  return data
    .map((items) => {
      const computedArray = items.dates
        .filter((item) => getParseDate(item.end_date) === getToday())
        .map(() => "сегдня");

      return computedArray.length > 0 ? { ...items, computedArray } : undefined;
    })
    .filter(Boolean) as ProcessedData[];
};

const getStatusStartTomorrow = (data: DataJSONType[]): ProcessedData[] => {
  return data
    .map((items) => {
      const computedArray = items.dates
        .filter((item) => getParseDate(item.end_date) === getTomorrow())
        .map(() => "завтра");

      return computedArray.length > 0 ? { ...items, computedArray } : undefined;
    })
    .filter(Boolean) as ProcessedData[];
};

export default { getStatusStartToday, getStatusStartTomorrow };
