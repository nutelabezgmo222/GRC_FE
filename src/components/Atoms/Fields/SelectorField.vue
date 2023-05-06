<template>
  <div>
    <select
      v-model="selected"
      class="p-3 border rounded w-40">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    name: 'TextArea',
    props: {
        selectedValue: {
            type: [String, Number],
            default: '',
            required: false,
            note: 'value of input'
        },
        options: {
            type: Array,
            default: () => [],
            required: true,
        },
    },
    emits: ['input'],
    data() {
        return {
            selected: null,
        };
    },
    watch: {
        selected(newValue) {
            if(newValue !== this.selectedValue) {
                this.$emit('selected', newValue);
            }
        },
        selectedValue(newValue) {
            if(newValue !== this.selected) {
                this.selected = newValue;
            }
        }
    },
    mounted() {
        this.selected = this.selectedValue;
    }
}
</script>