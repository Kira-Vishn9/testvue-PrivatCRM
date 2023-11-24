<script setup lang="ts">
import data from "../../../data/data.json";
import { DateType, ProcessedData } from "../../../types/types.ts";
import { ref } from "vue";
import mySelect from "../select/mySelect.vue";
import sorts from "../../../metodsSorts&Filters/sorts.ts";
import filters from "../../../metodsSorts&Filters/filters.ts";
import {
  getMinValueFromArray,
  getMaxValueFromArray,
  formatDate,
} from "../../../untils/helpers/helpers.ts";

const arrayTitle: string[] = [
  "id",
  "name",
  "diets",
  "tariff",
  "address",
  "phone",
  "dates",
  "discount",
  "order sum",
  "order payed",
  "pay status",
  "courier comment",
  "inner comment",
];
const rawData = ref<ProcessedData[]>(data as ProcessedData[]);
let stateArrow: boolean = false;
let selectedSort = ref<string>("");

enum FilterOption {
  All = "",
  StartsWithinXDaysShort = "Начинается через Х дней",
  EndsWithinXDays = "заканчивается через Х дней",
  EndedXDaysAgo = "закончилось Х дней назад",
  EndsToday = "заканчивается сегодня",
  EndsTomorrow = "заканчивается завтра",
}

const handleSelector = (selectedSort: FilterOption) => {
  console.log(selectedSort);
  switch (selectedSort) {
    case FilterOption.All:
      rawData.value = data;
      break;
    case FilterOption.StartsWithinXDaysShort:
      rawData.value = sorts.getStatusDiets(data, "start");
      changeStateArrowToAsc();
      break;
    case FilterOption.EndsWithinXDays:
      rawData.value = sorts.getStatusEndDiets(data);
      changeStateArrowToDsc();
      break;
    case FilterOption.EndedXDaysAgo:
      rawData.value = sorts.getStatusEndDietsAgo(data);
      changeStateArrowToDsc();
      break;
    case FilterOption.EndsToday:
      rawData.value = filters.getStatusStartToday(data);
      break;
    case FilterOption.EndsTomorrow:
      rawData.value = filters.getStatusStartTomorrow(data);
      break;
    default:
      break;
  }
};

const changeStateArrowToAsc = () => {
  stateArrow = false;
  sortData();
};
const changeStateArrowToDsc = () => {
  stateArrow = true;
  sortData();
};
const sortData = () => {
  rawData.value.sort((a, b) => {
    if (
      !a.computedArray ||
      !b.computedArray ||
      !a.computedArray.length ||
      !b.computedArray.length
    )
      return 0;
    if (
      a.computedArray.every((el) => typeof el === "string") &&
      b.computedArray.every((el) => typeof el === "string")
    )
      return 0;

    return stateArrow
      ? getMaxValueFromArray(a.computedArray) -
          getMaxValueFromArray(b.computedArray)
      : getMinValueFromArray(b.computedArray) -
          getMinValueFromArray(a.computedArray);
  });
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="title" v-for="key in arrayTitle">
          {{ key }}
        </th>
        <th>
          Status
          <mySelect
            @update:modelValue="handleSelector"
            v-model="selectedSort"
          />
          <span class="arrow dsc" @click="changeStateArrowToAsc"></span>
          <span class="arrow asc" @click="changeStateArrowToDsc"></span>
        </th>
      </tr>
    </thead>

    <tbody class="nothing">
      <tr v-for="entry in rawData">
        <td v-for="(value, key) in entry">
          <template v-if="Array.isArray(value)">
            <span v-if="key === 'dates'">
              <span v-for="(date, index) in value as DateType[]" :key="index">
                {{ formatDate(date) }}
                <br v-if="index !== value.length - 1" />
              </span>
            </span>
            <span v-else>
              <span v-for="(item, index) in value" :key="index">
                {{ item }}
                <br v-if="index !== value.length - 1" />
              </span>
            </span>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="rawData.length === 0"><h2>Ничего не найдено</h2></div>
</template>

<style scoped>
table {
  color: black;
  width: 100%;
  max-width: 100%;
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  overflow-x: auto;
  min-width: 100vw;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}
td > span > span:not(td > span > span:last-child) {
  border-bottom: 1px dotted black;
}

th:nth-child(8) {
  width: 50px;
}
th:nth-child(2),
th:nth-child(6),
th:nth-child(7),
th:nth-child(12),
th:nth-child(13) {
  width: 90px;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 11px solid #fff;
}

.arrow.dsc {
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-top: 11px solid #fff;
}
.title {
  word-break: break-word;
}
</style>
