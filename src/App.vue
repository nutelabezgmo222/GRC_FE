<template>
  <div class="app flex flex-row-reverse relative min-h-full">
    <Navbar
      v-if="isUserLogged"
      class="w-1/5 fixed top-0 bottom-0 transition-all"
      :class="hideNavbar ? '-left-full' : ' left-0'"
      :tabs="tabs"
      :preselected-tab="currentTab"
      @hide="hideNavbar = true" />

    <div
      class="main relative w-4/5 bg-main-gray px-3 pb-3 pr-0 transition-all flex flex-col"
      :class="[hideNavbar || !isUserLogged ? 'w-full' : '', isUserLogged ? 'bg-main-gray' : 'bg-white']">
      <div class="sticky top-0 z-10 bg-main-gray py-1">
        <div>
          <router-view
            class="mb-4"
            name="header" />
        </div>

        <div
          v-if="subbarItems.length"
          class="mb-4">
          <Subbar :items="subbarItems" />
        </div>
      </div>

      <div class="flex flex-col flex-grow">
        <router-view class="flex-grow overflow-auto" name="default" />
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
import { mapGetters, mapActions } from 'vuex';

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
            hideNavbar: false,
        };
    },
    computed: {
        ...mapGetters(['isUserLogged']),
        allNavItems() {
            if (!this.tabs) return [];

            return this.tabs.reduce((result, tab) => {
                tab.children && result.push(...tab.children);

                return result;
            }, []);
        },
        currentNavItem() {
            if (!this.allNavItems?.length) return;

            return this.allNavItems.find(item => this.routeMatches.includes(item.name));
        },
        currentTab() {
            if (!this.currentNavItem) return;

            const currentTab = this.tabs.find(tab => tab.children.some(child => child.path === this.currentNavItem.path));

            return currentTab.tab;
        },
        routeMatches() {
            if (!this.$route.matched) return [];
            return this.$route.matched.map(match => match.name);
        },
        subbarItems() {
            if (!this.currentNavItem) return []

            return this.currentNavItem.children || [];
        },
    },
    mounted() {
        this.getAllUsers();
    },
    methods: {
        ...mapActions(['getAllUsers'])
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