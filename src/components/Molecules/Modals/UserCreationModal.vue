<template>
  <div>
    <Modal
      :show="show"
      title="Create new user"
      @submit="onModalSubmit"
      @cancel="$emit('cancel')">
      <template #body>
        <LoadingIndicator v-if="loading" />

        <div v-else>
          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Name" />
            <InputField
              :value="name"
              @input="name = $event"/>
          </div>

          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Surname" />
            <InputField
              :value="surname"
              @input="surname = $event"/>
          </div>

          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Email" />
            <InputField
              :value="email"
              @input="email = $event"/>
          </div>

          <div class="mb-4">
            <Title
              type="small"
              class="mb-3"
              title="Password" />
            <InputField
              :value="password"
              type="password"
              @input="password = $event"/>
          </div>
        </div>
      </template>
    </Modal>

    <Notification :message="notificationMessages" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { createUser } from '../../../api/users';

import Modal from './Modal.vue';
import InputField from '../../Atoms/Fields/InputField.vue';
import Title from '../../Atoms/Title.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';
import Notification from '../../Atoms/Notification.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';

import { isEmailValid, isPasswordValid } from '../../../utils';

export default {
    name: 'UserCreationModal',
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
            name: '',
            surname: '',
            password: '',
            email: '',

            notificationMessages: [],
            loading: false
        };
    },
    computed: {
        ...mapGetters(['allUsers']),
        allUsersEmails() {
            if (!this.allUsers) return [];

            return this.allUsers.map(user => user.u_email);
        },
    },
    methods: {
        onModalSubmit() {
            if (!this.validate()) return;

            const data = {
                u_name: this.name,
                u_surname: this.surname,
                u_email: this.email,
                u_password: this.password
            };

            this.loading = true;

            return createUser(data)
                .then((newUser) => {
                    this.$emit('created', newUser);
                    this.resetData();
                })
                .catch((error) => {
                    const response = error.response;
                    this.notificationMessages = error.message + ' ' + (response.data.message || '');
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        validate() {
            this.notificationMessages = [];

            if (!this.name) {
                this.notificationMessages.push('Name field can`t be empty');
            }
            if (!this.surname) {
                this.notificationMessages.push('Surname field can`t be empty');
            }
            if (!this.email) {
                this.notificationMessages.push('Email field can`t be empty');
            } else if (!isEmailValid(this.email)) {
                this.notificationMessages.push('Email isn`t valid. Please enter valid email');
            } else if (this.allUsersEmails.includes(this.email)) {
                this.notificationMessages.push('Email field should be unique');
            }
            if (!isPasswordValid(this.password)) {
                this.notificationMessages.push('Password length should be at least 4 characters');
            }

            return !this.notificationMessages.length;
        },
        resetData() {
            this.name = '';
            this.surname = '';
            this.email = '';
            this.password = '';
        },
    },
};
</script>