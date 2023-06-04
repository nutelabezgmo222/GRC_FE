<template>
  <div>
    <label>
      <p v-if="title">{{ title }} </p>
      <input
        v-model="inputValue"
        class="p-2 bg-main-gray border-b-2 w-full rounded"
        :style="inputStyles"
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
        title: {
            type: String,
            default: '',
            requred: false
        },
        type: {
            type: String,
            default: 'text',
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
        inputStyles: {
            type: Object,
            required: false,
            default: () => ({}),
        },
    },
    emits: ['input'],
    data() {
        return {
            inputValue: null,
            timer: null,
            timeout: 300,
            mounted: false,
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

        this.mounted = true;
    }
}
</script>