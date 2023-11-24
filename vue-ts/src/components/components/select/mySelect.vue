<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const opitionsSelect = [
  "Начинается через Х дней",
  "заканчивается сегодня",
  "заканчивается завтра",
  "заканчивается через Х дней",
  "закончилось Х дней назад",
];
const props = defineProps({
  modelValue: String,
});
const emits = defineEmits(["update:modelValue"]);
const changeValue = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  emits("update:modelValue", event.target.value);
};
</script>

<template>
  <div id="example">
    <select :value="props.modelValue" @change="changeValue">
      <option :value="''">Please Select</option>
      <option v-for="option in opitionsSelect" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select {
  word-break: break-all;
  height: 60px;
  max-width: 120px !important;
}
</style>
