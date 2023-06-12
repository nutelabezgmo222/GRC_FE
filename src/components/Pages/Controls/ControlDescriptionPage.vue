<template>
  <div class="flex w-full h-full">
    <ControlCompletionModal :show="showCompleteControlModal" />
    <div class="w-8/10">
      <div class="mb-5">
        <p class="mb-3">
          <Title
            title="Description"
            type="small" />
        </p>
        <TextField
          :value="data.description"
          @input="onControlPropertyChange({description: $event})" />
      </div>

      <div class="mb-5">
        <p class="mb-3">
          <Title
            title="Expected evidence"
            type="small" />
        </p>
        <TextField
          :value="data.expected_evidence"
          @input="onControlPropertyChange({expected_evidence: $event})" />
      </div>

      <div class="mb-5 flex items-center">
        <p class="mr-3">
          <Title
            title="Deadline date:"
            type="small" />
        </p>
        <InputField
          type="datetime-local"
          :value="formattedDeadline"
          @input="onControlPropertyChange({deadline: $event})" />
      </div>

      <div>
        <Button
          type="save"
          button-text="Complete"
          class="w-56"
          @click="showCompleteControlModal = true" />
      </div>
    </div>

    <div class="w-2/10 border border-main-gray ml-4 rounded-md shadow-md p-5 h-full">
      <div>
        <div class="mb-3">
          <Title
            title="Responsible"
            class="mb-3"
            type="small" />
          
          <MyMultiselect
            :value="data.responsibleIds"
            :options="controlUserOptions"
            @input="onControlPropertyChange({responsibleIds: $event})"  />
        </div>

        <div class="mb-3">
          <Title
            title="Reviewer"
            class="mb-3"
            type="small" />
          
          <SingleSelect
            :value="data.reviewer"
            :options="controlUserOptions"
            @input="onControlPropertyChange({reviewer: $event})"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import TextField from '../../Atoms/Fields/TextField.vue';
import Title from '../../Atoms/Title.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';
import SingleSelect from '../../Atoms/Fields/SingleSelect.vue';
import InputField from '../../Atoms/Fields/InputField.vue';
import Button from '../../Atoms/Button.vue';
import ControlCompletionModal from '../../Molecules/Modals/ControlCompletionModal.vue';

import { toIsoString } from '../../../utils';

export default {
    name: 'ControlDescriptionPage',
    components: {
    TextField,
    Title,
    MyMultiselect,
    SingleSelect,
    InputField,
    Button,
    ControlCompletionModal,
    ControlCompletionModal
},
    props: {
        data: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
    data() {
        return {
            showCompleteControlModal: false,
        };
    },
    computed: {
        ...mapGetters(['controlUsers']),
        controlUserOptions() {
            if (!this.controlUsers) return [];
            return this.controlUsers.map(user => ({
                value: user.id,
                label: user.full_name
            }));
        },
        formattedDeadline() {
            if (!this.data.deadline) return '';
            return toIsoString(new Date(this.data.deadline));
        },
    },
    methods: {
        onControlPropertyChange(props) {
            this.$emit('propertyChanged', props);
        },
    },
};
</script>