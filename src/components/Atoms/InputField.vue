<template>
  <div>
    <label>
      <p>{{ title }} </p>
      <input
        v-model="inputValue"
        class="p-2 bg-main-gray border-b-2 w-full rouded"
        :class="{error: error}"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder">
    </label>
  </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        type: {
            type: String,
            default: 'text',
            requred: true
        },
        title: {
            type: String,
            default: 'Selector',
            requred: true
        },
        value: {
            type: [String, Number],
            default: '',
            required: false,
            note: 'value of input'
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        error: {
            type: Boolean,
            default: false,
            required: false
        },
        placeholder: {
            type: String,
            default: 'Search for...',
            required: false
        },
    },
    emits: ['input'],
    data() {
        return {
            inputValue: null
        };
    },
    watch: {
        inputValue(newValue) {
            this.$emit('input', newValue);
        },
        value(newValue) {
            if(newValue !== this.inputValue) {
                this.inputValue = newValue;
            }
        }
    },
    mounted() {
        if(this.value) {
            this.inputValue = this.value;
        }
    }
}
</script>