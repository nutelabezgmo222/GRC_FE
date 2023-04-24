<template>
  <div class="flex h-full">
    <Navbar class="w-1/5" />

    <div class="w-4/5 bg-main-gray">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Molecules/Header.vue';
import Navbar from './components/Molecules/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar,
        Header,
    },
    data() {
        return {};
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
</style>