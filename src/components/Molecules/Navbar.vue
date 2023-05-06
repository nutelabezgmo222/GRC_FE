<template>
  <div class="p-3 pl-0 bg-main-gray">
    <div class="bg-white shadow p-3 h-full rounded-md shadow-md">
      <div class="mb-4 flex justify-between items-center p-5">
        <div>
          MaxxRisk
        </div>

        <div>
          <Button
            type="util"
            @click="$emit('hide')">
            <div class="flex items-center">
              <FeatherIcon
                class="mr-3"
                icon="skip-back" />
              <span>Hide</span>
            </div> 
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-3 justify-items-center gap-4 mb-4">
        <div class="icon-wrapper selected">
          <FeatherIcon icon="user" />
        </div>

        <div class="icon-wrapper">
          <FeatherIcon icon="settings" />
        </div>

        <div class="icon-wrapper">
          <FeatherIcon icon="bell" />
        </div>
      </div>

      <div class="mb-4">
        <InputField
          class="w-full"
          title=""/>
      </div>

      <div class="mb-4 overflow-auto">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="border-b border-lightgray hover:bg-lightgray transition">
          <router-link
            class="flex items-center px-2 py-4 cursor-pointer"
            :to="item.path">
            <FeatherIcon
              v-if="item.icon"
              class="mr-2"
              :icon="item.icon" />
            <p>{{ item.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatherIcon from '../Atoms/FeatherIcon.vue';
import InputField from '../Atoms/Fields/InputField.vue';
import Button from '../Atoms/Button.vue';

export default {
    name: 'Navbar',
    components: {
        FeatherIcon,
        InputField,
        Button
    },
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        },
    },
};
</script>

<style scoped>
.icon-wrapper {
    background-color: white;
    border-radius: 100%;
    padding: 10px;
    cursor: pointer;
}
.icon-wrapper.selected {
    background-color: lightgray;
}
.router-link-active {
    background-color: #eee;
}
</style>