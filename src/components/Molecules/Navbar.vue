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
        <div
          v-for="tab in tabs"
          :key="tab.tab"
          class="icon-wrapper"
          :class="{selected: tab.tab === selectedTab?.tab}"
          @click="setTabByName(tab.tab)">
          <FeatherIcon :icon="tab.icon" />
        </div>
      </div>

      <div class="mb-4 overflow-auto">
        <div
          v-for="(item, idx) in navItems"
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
import Button from '../Atoms/Button.vue';

export default {
    name: 'Navbar',
    components: {
        FeatherIcon,
        Button
    },
    props: {
        tabs: {
            type: Array,
            required: true,
            default: () => []
        },
        preselectedTab: {
            type: String,
            required: false,
            default: ''
        },
    },
    data() {
        return {
            selectedTab: null
        };
    },
    computed: {
        navItems() {
            if (!this.selectedTab) return [];
            
            return this.selectedTab.children.map(item => ({
                title: item.title,
                path: item.path,
                icon: item.icon
            }));
        },
    },
    watch: {
        preselectedTab(newTab) {
            this.setTabByName(newTab);
        }
    },
    beforeMount() {
        this.selectedTab = this.tabs[0];
    },
    methods: {
        setTabByName(tabName) {
            this.selectedTab = this.tabs.find(tab => tab.tab === tabName) || this.tabs[0];
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