<template>
  <div class="w-full bg-white rounded p-3 flex">
    <div>
      <router-link
        v-for="item in items"
        :key="item.path"
        class="mr-4 px-4 py-2 cursor-pointer"
        :to="item.path">
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    data() {
        return {};
    },
};
</script>

<style scoped>
.router-link-active {
    background-color: #eee;
}
</style>