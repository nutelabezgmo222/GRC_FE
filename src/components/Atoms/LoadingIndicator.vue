<template>
  <div class="flex items-center p-3 justify-center">
    <FeatherIcon
      class="animate-spin mr-2"
      icon="loader" />
    <p class="text-xl">
      Loading{{dots}}
    </p>
  </div>
</template>

<script>
import FeatherIcon from './FeatherIcon.vue';

export default {
    components: {
        FeatherIcon
    },
    data() {
        return {
            dots: '...',
            phase: 0,
            interval: null
        };
    },
    mounted() {
        this.interval = setInterval(() => {
            this.dots = ++this.phase % 2 ? '..' : '...';
        }, 1000);
    },
    unmounted() {
        clearInterval(this.interval);
    }
};
</script>