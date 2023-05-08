<template>
  <Modal
    :show="show"
    title="Create new risk"
    @submit="onModalSubmit"
    @cancel="$emit('cancel')">
    <template #body>
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
    </template>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { createRisk } from '../../../api/risks';

import Modal from './Modal.vue';
import InputField from '../../Atoms/Fields/InputField.vue';
import Title from '../../Atoms/Title.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';

export default {
    components: {
        Modal,
        InputField,
        Title,
        MyMultiselect
    },
    props: {
        show: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['cancel'],
    data() {
        return {
            title: '',
            responsibles: []
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
            const data = {
                title: this.title,
                responsibles: this.responsibles
            };
            return createRisk(data);
        },
    },
};
</script>