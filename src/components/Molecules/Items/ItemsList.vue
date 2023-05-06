<template>
  <div
    class="grid gap-4 grid-cols-4">
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="h-52">
      <ItemCard
        class="h-full"
        :item="item" />
    </div>
  </div>
</template>

<script>
import Title from '../../Atoms/Title.vue';
import ItemCard from './ItemCard.vue';
import { ObjectTypes } from '../../../constants/ObjectTypes';

export default {
    components: {
        Title,
        ItemCard
    },
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        },
        itemsType: {
            type: String,
            required: true,
            default: null,
        },
        title: {
            type: String,
            required: false,
            default: 'Title'
        },
    },
    data() {
        return {
            ObjectTypes
        };
    },
};
</script>