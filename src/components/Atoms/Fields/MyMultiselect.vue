<template>
  <VueMultiselect
    :value="selectedValues"
    mode="tags"
    :close-on-select="false"
    :searchable="true"
    :options="options"
    @input="onMultiselectChange" />
</template>


<script>
import VueMultiselect from '@vueform/multiselect';

export default {
    name: 'MyMultiselect',
    components: {
        VueMultiselect
    },
    props: {
        value: {
            type: Array,
            required: true,
            default: () => []
        },
        options: {
            type: Array,
            required: true,
            default: () => []
        },
    },
    emits: ['input'],
    data() {
        return {
            selectedValues: [],
        };
    },
    mounted() {
        this.selectedValues = this.value.slice();
    },
    methods: {
        onMultiselectChange(selectedValues) {
            this.selectedValues = selectedValues;
            this.$emit('input', selectedValues);
        }
    },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
* {
    --ms-tag-bg: #0077b6;
}
</style>