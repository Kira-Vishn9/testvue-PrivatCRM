<script setup lang="ts">
import { formatDate } from "../../../untils/helpers/helpers.ts";
import { DateType } from "../../../types/types.ts";

const props = defineProps(["value", "date", "isArrayDates"]);
</script>

<template>
  <span v-if="props.isArrayDates(props.value)">
    <span v-for="(date, index) in props.value as DateType[]" :key="index">
      {{ formatDate(date) }}
      <br v-if="index !== props.value.length - 1" />
    </span>
  </span>
  <span v-else>
    <span v-for="(item, index) in props.value" :key="index">
      {{ item }}
      <br v-if="index !== props.value.length - 1" />
    </span>
  </span>
</template>

<style scoped></style>
