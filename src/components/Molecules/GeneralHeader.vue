<template>
  <div>
    <Title
      :title="title"
      type="big" />
  </div>
</template>

<script>
import Title from '../Atoms/Title.vue';

export default {
    components: {
        Title
    },
    props: {
        title: {
            type: String,
            required: true,
            default: 'Title'
        },
    },
};
</script>