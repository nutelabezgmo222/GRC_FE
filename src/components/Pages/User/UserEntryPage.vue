<template>
  <div class="h-full">
    <Notification :message="notificationMessages" />
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <ItemWrapper
      v-else
      :header-props="headerProps"
      class="h-full"
      @propertyChanged="onPropertyChange">
      <template #content>
        <div>
          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Name"
                type="small" />
            </p>

            <InputField
              :value="user.u_name"
              @input="onPropertyChange({ u_name: $event })"/>
          </div>

          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Surname"
                type="small" />
            </p>

            <InputField
              :value="user.u_surname"
              @input="onPropertyChange({ u_surname: $event })"/>
          </div>

          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Email"
                type="small" />
            </p>

            <InputField
              :value="user.u_email"
              @input="onPropertyChange({ u_email: $event })"/>
          </div>
          
          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Password"
                type="small" />
            </p>

            <InputField
              type="password"
              @input="onPropertyChange({ u_password: $event })"/>
          </div>

          <div class="flex items-center">
            <div class="mr-5">
              <p class="mb-3">
                <Title
                  title="Risk access level"
                  type="small" />
              </p>

              <SingleSelect
                :value="user.r_access_level"
                :options="userLevelOptions" />
            </div>
          </div>
        </div>
      </template>
    </ItemWrapper>
  </div>
</template>

<script>
import { updateUser } from '../../../api/users';
import { mapActions } from 'vuex';

import ItemWrapper from '../../Molecules/ItemBlocks/ItemWrapper.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import InputField from '../../Atoms/Fields/InputField.vue';
import Title from '../../Atoms/Title.vue';
import Notification from '../../Atoms/Notification.vue';
import SingleSelect from '../../Atoms/Fields/SingleSelect.vue';
import { UserLevels } from '../../../constants/UserLevels';

export default {
    components: {
        ItemWrapper,
        LoadingIndicator,
        InputField,
        Title,
        Notification,
        SingleSelect
    },
    props: {
        id: {
            type: [String, Number],
            required: true,
            default: null,
            note: 'user id'
        },
    },
    data() {
        return {
            user: null,
            loading: false,
            notificationMessages: [],
            UserLevels
        };
    },
    computed: {
        headerProps() {
            return {
                id: this.user.id,
                title: this.user.full_name,
                disabled: true
            };
        },
        userLevelOptions() {
            return Object.entries(UserLevels).map(entry => {
                const [value, label] = entry;

                return {value, label};
            });
        },
    },
    beforeMount() {
        this.loading = true;

        this.getUserById(this.id).then(user => {
            this.user = user;
            this.loading = false;
        });
    },
    methods: {
        ...mapActions(['getUserById']),
        onPropertyChange(props) {
            this.user = {
                ...this.user,
                ...props
            };

            if (!this.validate()) return;

            return updateUser(this.user.id, this.user)
                .then(updatedUser => {
                    this.user = updatedUser;
                    this.$emit('updated', updatedUser);
                });
        },
        validate() {
            this.notificationMessages = [];

            if (!this.user.u_name) {
                this.notificationMessages.push('You can`t save user with empty name');
            }
            if (!this.user.u_surname) {
                this.notificationMessages.push('You can`t save user with empty surname');
            }

            return !this.notificationMessages.length;
        }
    },
};
</script>