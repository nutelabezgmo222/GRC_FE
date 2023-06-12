<template>
  <div>
    <input
      type="file"
      class="p-2 bg-main-gray border-b-2 w-full rounded"
      :disabled="disabled"
      :placeholder="placeholder"
      @change="onFilesLoad"
      multiple>
  </div>
</template>

<script>
export default {
    name: 'FileInput',
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false
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

    },
    mounted() {
        if(this.value) {
            this.inputValue = this.value;
        }

        this.mounted = true;
    },
    methods: {
        onFilesLoad(event) {
            this.$emit('input', event.target.files);
        }
    }
}
</script>