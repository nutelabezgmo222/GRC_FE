<template>
  <div
    :key="filtersKey"
    class="p-4 bg-white mr-5 rounded-md flex flex-wrap">
    <div class="mr-5">
      <div class="mb-2">
        Search string
      </div>

      <div class="w-80">
        <InputField
          :value="searchString"
          @input="onSearchStringChange" />
      </div>
    </div>

    <div
      v-for="(filter, idx) in filterBy"
      :key="idx"
      class="mr-5">
      <div class="mb-2">
        {{ filter.groupTitle }}:
      </div>

      <div class="w-80">
        <MyMultiselect
          :value="selectedFilters[filter.groupId]"
          :options="filter.items"
          @input="onFilterChange($event, filter.groupId)"/>
      </div>
    </div>

    <div v-if="groupBy">
      <div class="mb-2">
        Group by:
      </div>

      <div class="w-80">
        <SingleSelect
          :value="selectedGroupBy"
          :options="groupBy"
          @input="onGroupByChange" />
      </div>
    </div>

    <div
      class="flex items-center justify-center ml-8 border px-3 h-12 self-end rounded-md border-main-gray cursor-pointer"
      @click="onReset">
      <div class="mr-2">
        Reset
      </div>

      <FeatherIcon icon="rotate-cw" />
    </div>
  </div>
</template>

<script>
import InputField from '../Atoms/Fields/InputField.vue';
import SingleSelect from '../Atoms/Fields/SingleSelect.vue';
import MyMultiselect from '../Atoms/Fields/MyMultiselect.vue';
import FeatherIcon from '../Atoms/FeatherIcon.vue';

export default {
    name: 'FiltersMenu',
    components: {
        InputField,
        SingleSelect,
        MyMultiselect,
        FeatherIcon
    },
    props: {
        groupBy: {
            type: Object,
            required: false,
            default: null
        },
        filterBy: {
            type: Array,
            required: false,
            default: () => []
        },
    },
    data() {
        return {
            searchString: '',
            selectedGroupBy: null,
            selectedFilters: {},
            filtersKey: 1
        };
    },
    beforeMount() {
        this.filterBy?.forEach(filterBy => {
            this.selectedFilters[filterBy.groupId] = [];
        });
    },
    methods: {
        onSearchStringChange(value) {
            this.searchString = value;
            this.$emit('searchStringChange', value);
        },
        onFilterChange(items, filterGroupId) {
            this.selectedFilters[filterGroupId] = items;
            this.$emit('filtersChange', { selectedValues: items, id: filterGroupId });
        },
        onGroupByChange(itemId) {
            this.selectedGroupBy = itemId;
            this.$emit('groupByChange', itemId);
        },
        onReset() {
            this.searchString = '';
            this.selectedGroupBy = null;
            this.selectedFilters = {};
            this.filtersKey++;

            this.$emit('reset');
        },
    },
};
</script>