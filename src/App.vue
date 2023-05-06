<template>
  <div class="flex flex-row-reverse h-full relative">
    <Navbar
      v-if="isUserLogged"
      class="w-1/5 absolute top-0 bottom-0 transition-all"
      :class="hideNavbar ? '-left-full' : ' left-0'"
      :tabs="tabs"
      @hide="hideNavbar = true" />

    <div
      class="main relative overflow-hidden w-4/5 bg-main-gray p-3 pr-0 transition-all"
      :class="[hideNavbar || !isUserLogged ? 'w-full' : '', isUserLogged ? 'bg-main-gray' : 'bg-white']">
      <router-view
        class="mb-4"
        name="header" />

      <div class="flex flex-col h-full">
        <router-view class="flex-grow" name="default" />
      </div>
    </div>

    <div
      v-if="hideNavbar"
      class="bg-main-gray p-3">
      <Button
        type="util"
        @click="hideNavbar = !hideNavbar">
        <div class="">
          <FeatherIcon
            icon="skip-forward" />
        </div> 
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from './components/Molecules/Navbar.vue';
import Subbar from './components/Molecules/Subbar.vue';
import Button from './components/Atoms/Button.vue';
import FeatherIcon from './components/Atoms/FeatherIcon.vue';

import navigation from './constants/navigation';

export default {
    name: 'App',
    components: {
        Navbar,
        Subbar,
        Button,
        FeatherIcon
    },
    data() {
        return {
            tabs: navigation,
            selectedTab: null,
            hideNavbar: false,
        };
    },
    computed: {
        ...mapGetters(['isUserLogged']),
        tabItems() {
            if (!this.tabs) return [];

            return this.tabs.map(item => ({
                title: item.title,
                icon: item.icon
            }));
        },
        navItems() {
            if (!this.selectedTab) return [];
            
            return this.selectedTab.children.map(item => ({
                title: item.title,
                path: item.path,
                icon: item.icon
            }));
        },
        currentNavItem() {

        }
    },
    beforeMount() {
        this.selectedTab = this.tabs[0];
    },
};
</script>

<style>
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      outline: none;
  }
  #app {
      height: 100vh;
  }
  .transition-all {
      transition: all 0.4s ease;
  }
</style>