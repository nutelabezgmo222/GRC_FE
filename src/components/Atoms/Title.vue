<template>
  <div>
    <h1
      v-if="type === TitleTypes.BIG"
      class="text-4xl text-main-blue font-bold">
      {{ title }}
    </h1>

    <h2
      v-else-if="type === TitleTypes.MEDIUM"
      class="text-2xl text-main-blue font-bold">
      {{ title }}
    </h2>

    <h3
      v-else-if="type === TitleTypes.SMALL"
      class="text-xl text-main-blue">
      {{ title }}
    </h3>

    <p v-else>
      {{ title }}
    </p>
  </div>
</template>

<script>
const TitleTypes = {
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'big'
};

export default {
    props: {
        title: {
            type: String,
            required: true,
            default: 'Title'
        },
        type: {
            type: String,
            required: false,
            default: 'medium',
            validator: type => Object.values(TitleTypes).includes(type)
        },
    },
    data() {
        return {
            TitleTypes
        };
    },
};
</script>