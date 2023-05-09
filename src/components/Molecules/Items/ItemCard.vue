<template>
  <div class="p-4 bg-slate-50 rounded-lg shadow flex flex-col justify-between">
    <div class="mb-2 cursor-pointer text-ellipsis">
      <PreviewModal :data-obj="item">
      </PreviewModal>
    </div>

    <div class="mb-2 line-clamp-[2] text-ellipsis whitespace-pre-line">
      <span class="italic">Description: </span>
      <span>{{ item.description }}</span>
    </div>    

    <div v-if="item.objType === ObjectTypes.CONTROL">
      <div class="mb-2 line-clamp-[2] text-ellipsis whitespace-pre-line">
        <span class="italic">Expected evidence: </span>
        <span>{{ item.expected_evidence }}</span>
      </div>

      <div class="mb-2">
        <span class="italic">Deadline: </span>
        <span>{{ item.deadline }}</span>
      </div>
    </div>

    <div v-if="item.objType === ObjectTypes.RISK">
      <div class="mb-2 line-clamp-[2] text-ellipsis whitespace-pre-line">
        <span class="italic">Status: </span>
        <span>{{ item.status }}</span>
      </div>

      <div class="font-bold">
        <p v-if="item.approve_date">Approved</p>
        <p v-else>Not approved</p>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../../Atoms/Title.vue';
import PreviewModal from '../../Molecules/Modals/PreviewModal.vue';
import { ObjectTypes } from '../../../constants/ObjectTypes';

export default {
    components: {
      Title,
      PreviewModal
    },
    props: {
        item: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
    data() {  
        return {
            ObjectTypes
        };
    },
};
</script>