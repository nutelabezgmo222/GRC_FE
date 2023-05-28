<template>
  <VueGoodTable
    :columns="columns"
    :rows="rows">
    <template #table-row="{column, formattedRow, row}">
      <slot
        :name="column.field"
        :data="formattedRow[column.field]"
        :row="row">
        {{ formattedRow[column.field] }}
      </slot>
    </template>
  </VueGoodTable>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';

export default {
    name: 'Table',
    components: {
        VueGoodTable,
    },
    props: {
        columns: {
            type: Array,
            required: true,
            default: () => [],
            note: 'format https://borisflesch.github.io/vue-good-table-next/guide/configuration/'
        },
        rows: {
            type: Array,
            required: false,
            default: () => []
        },
    },
};
</script>

<style src="vue-good-table-next/dist/vue-good-table-next.css"></style>

<style>
    .vgt-responsive, .vgt-table {
        border-radius: 10px;
    }
</style>