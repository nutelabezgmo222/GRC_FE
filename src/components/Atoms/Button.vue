<template>
  <button :class="type">
    {{ buttonText }}
  </button>
</template>

<script>
const ButtonTypes = ['save', 'util', 'remove'];

export default {
  props: {
      buttonText: {
          type: String,
          required: true
      },
      type: {
          type: String,
          required: false,
          default: 'util',
          validator: (type) => ButtonTypes.includes(type)
      },
  }
}
</script>

<style scoped>
  button {
      padding: 10px 20px;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
      background: none;
  }
  .save {
      color: #fff;
      background-color: blue;
  }
  .remove {
      background-color: tomato;
      color: #fff;
  }
</style>