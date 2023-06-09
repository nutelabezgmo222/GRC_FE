<template>
  <div>
    <Modal
      :show="show"
      title="Create new risk"
      @submit="onModalSubmit"
      @cancel="$emit('cancel')">
      <template #body>
        <LoadingIndicator v-if="loading" />

        <div v-else>
          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Title" />
            <InputField
              :value="title"
              @input="title = $event"/>
          </div>

          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Responsibles" />
            
            <MyMultiselect
              :value="responsibles"
              :options="allUsersOptions"
              @input="responsibles = $event" />
          </div>
        </div>
      </template>
    </Modal>

    <Notification :message="notificationMessages" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createRisk } from '../../../api/risks';

import Modal from './Modal.vue';
import InputField from '../../Atoms/Fields/InputField.vue';
import Title from '../../Atoms/Title.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';
import Notification from '../../Atoms/Notification.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';

export default {
    components: {
        Modal,
        InputField,
        Title,
        MyMultiselect,
        Notification,
        LoadingIndicator
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
            title: '',
            responsibles: [],
            notificationMessages: [],
            loading: false
        };
    },
    computed: {
        ...mapGetters(['allUsers']),
        allUsersOptions() {
            if (!this.allUsers) return [];

            return this.allUsers.map(user => ({
                label: user.full_name,
                value: user.id
            }));
        },
    },
    methods: {
        onModalSubmit() {
            if (!this.validate()) return;

            const data = {
                title: this.title,
                responsibles: this.responsibles
            };

            this.loading = true;

            return createRisk(data)
                .then((newRisk) => {
                    this.$emit('created', newRisk);
                })
                .finally(() => {
                    this.loading = false;
                    this.resetData();
                });
        },
        validate() {
            this.notificationMessages = [];

            if (!this.title) {
                this.notificationMessages.push('You can`t create risk with empty title');
            }
            if (!this.responsibles.length) {
                this.notificationMessages.push('Risk should have at least one responsible person');
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