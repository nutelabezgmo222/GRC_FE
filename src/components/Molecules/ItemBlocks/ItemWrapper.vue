<template>
  <div class="px-5 py-10 bg-white rounded-md shadow-md flex flex-col">
    <div class="flex flex-col mb-10">
      <div class="flex items-center mb-5">
        <p class="mr-5">
          ID: {{ headerProps.id }}
        </p>

        <InputField
          :disabled="headerProps.disabled || false"
          :value="headerProps.title"
          @input="$emit('propertyChanged', { title: $event })"/>
      </div>

      <div>
        TABS: [] [] []
      </div>
    </div>

    <div class="p-5 border rounded overflow-auto">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import InputField from '../../Atoms/Fields/InputField.vue';

export default {
    components: {
        InputField
    },
    props: {
        headerProps: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
};
</script>