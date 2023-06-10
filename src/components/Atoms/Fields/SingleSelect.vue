<template>
  <VueMultiselect
    :value="selectedValue"
    :options="options"
    :label="labelProp"
    :value-prop="valueProp"
    :open-direction="openDirection"
    @input="onSingleSelectChange" />
</template>


<script>
import VueMultiselect from '@vueform/multiselect';

export default {
    name: 'SingleSelect',
    components: {
        VueMultiselect
    },
    props: {
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        value: {
            type: [Array, Number, String],
            required: false,
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
        openDirection: {
            type: String,
            required: false,
            default: 'bottom',
            validator: value => ['top', 'bottom'].includes(value)
        },
    },
    emits: ['input'],
    data() {
        return {
            selectedValue: '',
        };
    },
    watch: {
        value() {
            this.selectedValue = this.value || '';
        },
    },
    mounted() {
        this.selectedValue = this.value || '';
    },
    methods: {
        onSingleSelectChange(selectedValue) {
            this.selectedValue = selectedValue;
            this.$emit('input', selectedValue);
        }
    },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
* {
    --ms-option-bg-selected: #0077b6;
    --ms-option-bg-selected-pointed: #04699f;
    --ms-ring-color: #04699f4d;
}
</style>