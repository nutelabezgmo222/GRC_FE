<template>
  <VueMultiselect
    :value="selectedValue"
    :options="options"
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
            selectedValue: '',
        };
    },
    mounted() {
        this.selectedValue = this.value;
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
    --ms-tag-bg: #0077b6;
}
</style>