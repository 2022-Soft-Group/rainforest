<template>
  <n-select
    v-model:value="multipleSelectValue"
    v-if="isColumn"
    filterable
    multiple
    :options="options"
    :fallback-option="false"
    clearable
    :consistent-menu-width="false"
    @blur="emits('column-finish')"
  ></n-select>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getMyColumns } from '@/api/columns';
const props = defineProps<{ isColumn: boolean }>();
const emits = defineEmits(['column-finish']);
const multipleSelectValue = ref([]);
defineExpose({ multipleSelectValue });
const options = ref<Array<{ label: string; value: string }>>([]);

function reload() {
  getMyColumns({ page: 0, size: 99 }).then((res) => {
    if (res.data.status == 0) {
      res.data.data.columns.forEach((ele: any) => [
        options.value.push({
          label: ele.title,
          value: ele.id,
        }),
      ]);
    }
  });
}

onMounted(reload);
</script>
