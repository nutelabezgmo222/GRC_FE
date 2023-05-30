<template>
  <VueMultiselect
    :value="selectedValues"
    mode="tags"
    :close-on-select="false"
    :searchable="true"
    :options="options"
    :label="labelProp"
    :value-prop="valueProp"
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
        labelProp: {
            type: String,
            required: false,
            default: 'label'
        },
        valueProp: {
            type: String,
            required: false,
            default: 'value'
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
    --ms-ring-color: #04699f4d;
}
</style>