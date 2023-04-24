<template>
  <div class="bg-white shadow p-3">
    <div class="mb-4">
      Logo
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
        v-for="(item, idx) in navbarList"
        :key="idx"
        class="border-b border-lightgray hover:bg-lightgray transition">
        <router-link
          class="flex items-center px-2 py-4 cursor-pointer"
          :to="item.url">
          <FeatherIcon
            class="mr-2"
            :icon="item.icon" />
          <p>{{ item.title }}</p>
        </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import FeatherIcon from '../Atoms/FeatherIcon.vue';
import InputField from '../Atoms/InputField.vue';

export default {
    name: 'Navbar',
    components: {
        FeatherIcon,
        InputField
    },
    data() {
        return {};
    },
    computed: {
        navbarList() {
            return [{
                icon: 'home',
                title: 'Navbar list title',
                url: '/helloWorld'
            }, {
                icon: 'home',
                title: 'Navbar list title',
                url: '/helloWorld'
            }, {
                icon: 'home',
                title: 'Navbar list title',
                url: '/helloWorld'
            }, {
                icon: 'home',
                title: 'Navbar list title',
                url: '/helloWorld'
            }, {
                icon: 'home',
                title: 'Navbar list title',
                url: '/helloWorld'
            }];
        }
    }
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
</style>