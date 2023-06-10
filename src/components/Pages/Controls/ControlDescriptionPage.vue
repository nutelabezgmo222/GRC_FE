<template>
  <div>
    <div class="mb-5">
      <p class="mb-3">
        <Title
          title="Description"
          type="small" />
      </p>
      <TextField
        :value="data.description"
        @input="onControlPropertyChange({description: $event})" />
    </div>

    <div class="mb-5">
      <p class="mb-3">
        <Title
          title="Expected evidence"
          type="small" />
      </p>
      <TextField
        :value="data.expected_evidence"
        @input="onControlPropertyChange({expected_evidence: $event})" />
    </div>
  </div>
</template>

<script>
import TextField from '../../Atoms/Fields/TextField.vue';
import Title from '../../Atoms/Title.vue';

export default {
    name: 'ControlDescriptionPage',
    components: {
        TextField,
        Title
    },
    props: {
        data: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
    data() {
        return {};
    },
    methods: {
        onControlPropertyChange(props) {
            this.$emit('propertyChanged', props);
        },
    },
};
</script>