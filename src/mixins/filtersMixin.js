export const filtersMixin = {
    data() {
        return {
            searchString: '',
            selectedFilters: {},
            groupBy: null,
        };
    },
    methods: {
        onFiltersChange({selectedValues, id}) {
            this.selectedFilters[id] = selectedValues;
        },
        onFiltersReset() {
            this.searchString = '';
            this.groupBy = null;
            this.selectedFilters = {};
        }
    },
};