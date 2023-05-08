<template>
  <button :class="type">
    {{ buttonText }}
    <slot />
  </button>
</template>

<script>
const ButtonTypes = ['save', 'util', 'remove'];

export default {
  props: {
      buttonText: {
          type: String,
          required: false,
          default: ''
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
      border-radius: 5px;
      cursor: pointer;
      background: none;
      transition: 0.4s ease all;
  }
  .save {
      color: #fff;
      background-color: #0077b6;
  }
  .remove {
      background-color: #FCA311;
      color: #fff;
  }
  .util {
      background-color: #f1f1f1;
  }
  .util:hover {
      background-color: #ccc;
  }
</style>