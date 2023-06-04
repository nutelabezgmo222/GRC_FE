<template>
  <div class="overflow-auto p-10">
    <div class="flex items-center">
      <div class="cell flex items-center justify-center">
        Score value:
      </div>

      <div
        v-for="itemNumber in ((rowsData[0]?.length || 1) - 1)"
        :key="itemNumber"
        class="cell flex items-center justify-center text-lg relative">
        <div>
          {{ itemNumber }}
        </div>

        <FeatherIcon
          v-if="!readOnly && itemNumber > minColsNumber"
          class="font-bold text-main-orange cursor-pointer absolute top-0 -translate-y-full z-2"
          stroke-width="2"
          icon="x"
          @click="deleteColumn(itemNumber)" />
      </div>

      <div
        v-if="!readOnly && rowsData.length"
        class="ml-4">
        <FeatherIcon
          class="font-bold text-light-blue cursor-pointer"
          stroke-width="2"
          icon="plus"
          @click="addColumn" />
      </div>
    </div>

    <div
      v-for="(row, rowIdx) in rowsData"
      :key="rowIdx"
      class="flex items-center relative">
      <div
        v-for="(col, colIdx) in row"
        :key="colIdx"
        class="cell">

        <InputField
          :value="col"
          :input-styles="{background: 'transparent'}"
          :disabled="readOnly"
          @input="onTableColChange($event, rowIdx, colIdx)"/>
      </div>

      <FeatherIcon
        v-if="!readOnly && (rowIdx + 1) > minRowsNumber"
        class="font-bold text-main-orange cursor-pointer absolute left-0 -translate-x-full z-2"
        stroke-width="2"
        icon="x"
        @click="deleteRow(rowIdx)" />
    </div>

    <div
      v-if="!readOnly && rowsData.length < maxRowsNumber"
      class="mt-4">
      <div>
        <FeatherIcon
          class="font-bold text-light-blue cursor-pointer"
          stroke-width="2"
          icon="plus"
          @click="addRow" />
      </div>
    </div>
  </div>
</template>

<script>
import FeatherIcon from './FeatherIcon.vue';
import InputField from './Fields/InputField.vue';

export default {
    name: 'ExpandableTable',
    components: {
        FeatherIcon,
        InputField
    },
    props: {
        rows: {
            type: Array,
            required: false,
            default: () => []
        },
        maxRowsNumber: {
            type: Number,
            required: false,
            default: 10,
            validator: num => num > 0
        },
        maxColsNumber: {
            type: Number,
            required: false,
            default: 10,
            validator: num => num > 0
        },
        minRowsNumber: {
            type: Number,
            required: false,
            default: 1,
            validator: num => num > 0
        },
        minColsNumber: {
            type: Number,
            required: false,
            default: 2,
            validator: num => num > 0
        },
        readOnly: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    data() {
        return {
            rowsData: []
        };
    },
    mounted() {
        this.rowsData = this.rows ? JSON.parse(JSON.stringify(this.rows)) : [];
    },
    methods: {
        addColumn() {
            this.rowsData.forEach(row => {
                row.push('');
            });
            this.emitTableChanged();
        },
        addRow() {
            let colsLength = this.rowsData.length ? this.rowsData[0].length : 1;
            this.rowsData.push(Array.from(Array(colsLength)).fill(''));
            this.emitTableChanged();
        },
        deleteColumn(colIdx) {
            this.rowsData.forEach(row => {
                row.splice(colIdx, 1);
            })
            this.emitTableChanged();
        },
        deleteRow(rowIdx) {
            this.rowsData.splice(rowIdx, 1);
            this.emitTableChanged();
        },
        onTableColChange(newValue, rowIdx, colIdx) {
            this.rowsData[rowIdx][colIdx] = newValue;
            this.emitTableChanged();
        },
        emitTableChanged() {
            this.$emit('tableChanged', this.rowsData);
        },
    },
};
</script>

<style scoped>
.cell {
    width: 175px;
    min-width: 175px;
    height: 40px;
    border: 1px solid black;
    margin: 2px;
    background: white;
}
</style>