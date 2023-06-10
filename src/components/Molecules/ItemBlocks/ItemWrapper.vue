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
    </div>

    <div class="flex relative text-center">
      <div
        v-for="tab in headerProps.tabs"
        :key="tab.key"
        :class="{selected: tab.key === selectedTab}"
        class="p-3 w-32 cursor-pointer"
        @click="onTabClick(tab.key)">
        {{ tab.title }}
      </div>
    </div>
    <div class="p-5 border rounded overflow-auto flex-grow">
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
        selectedTab: {
            type: String,
            required: false,
            default: 'description'
        },
    },
    methods: {
        onTabClick(tabKey) {
            if (tabKey === this.selectedTab) return;

            this.$emit('tabClick', tabKey);
        }
    },
};
</script>

<style scoped>
  .selected {
      border: 1px solid #E5E5E5;
      background-color: white;
      margin-bottom: -2px;
      border-bottom: none;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
  }
</style>