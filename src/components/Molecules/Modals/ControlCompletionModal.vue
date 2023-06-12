<template>
  <div>
    <Modal
      :show="show"
      title="Complete control"
      ok-button-text="Complete"
      @submit="onModalSubmit"
      @cancel="$emit('cancel')">
      <template #body>
        <LoadingIndicator v-if="loading"/>

        <div v-else>
          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Description" />
            <TextField
              :value="description"
              @input="description = $event"/>
          </div>

          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Attach files" />
            
            <FileInput @input="attachedFiles = $event" />
          </div>
        </div>
      </template>
    </Modal>

    <Notification :message="notificationMessages" />
  </div>
</template>

<script>
import { createControl } from '../../../api/controls';

import Modal from './Modal.vue';
import TextField from '../../Atoms/Fields/TextField.vue';
import Title from '../../Atoms/Title.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';
import Notification from '../../Atoms/Notification.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import FileInput from '../../Atoms/Fields/FileInput.vue';

export default {
    components: {
    Modal,
    TextField,
    Title,
    MyMultiselect,
    Notification,
    LoadingIndicator,
    FileInput
},
    props: {
        show: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['cancel', 'created'],
    data() {
        return {
            description: '',
            attachedFiles: [],
            loading: false,
            notificationMessages: []
        };
    },
    computed: {
    },
    methods: {
        onModalSubmit() {
            if (!this.validate()) return;

            const data = {
                title: this.title,
                responsibles: this.responsibles
            };

            this.loading = true;

            return createControl(data)
                .then((newControl) => {
                    this.$emit('created', newControl);
                })
                .finally(() => {
                    this.loading = false;
                    this.resetData();
                });
        },
        validate() {
            this.notificationMessages = [];

            if (!this.title) {
                this.notificationMessages.push('You can`t create control with empty title');
            }
            if (!this.responsibles.length) {
                this.notificationMessages.push('Control should have at least one responsible person');
            }

            return !this.notificationMessages.length;
        },
        resetData() {
            this.title = '';
            this.responsibles = [];
        },
    },
};
</script>