<template>
  <div>
    <p v-if="title">{{ title }}</p>
    <textarea
      v-model="inputValue"
      class="p-2 bg-main-gray border-b-2 w-full rounded"
      :class="{error: error}"
      :disabled="disabled"
      :placeholder="placeholder">
    </textarea>
  </div>
</template>

<script>
export default {
    name: 'TextArea',
    props: {
        title: {
            type: String,
            default: '',
            requred: false
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
            default: '',
            required: false
        },
    },
    emits: ['input'],
    data() {
        return {
            inputValue: null,
            timer: null,
            timeout: 300,
        };
    },
    watch: {
        inputValue(newValue) {
            if(newValue === this.value) return;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$emit('input', newValue);
            }, this.timeout);
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