<template>
  <div class="pr-4">
    <div class="mb-4">
      <Button
        type="save"
        @click="showCreationModal = true">
          <span>Create new User</span>
      </Button>

      <UserCreationModal
        :show="showCreationModal"
        @created="onUserCreate"
        @cancel="showCreationModal = false"/>
    </div>
    
    <Table
      :columns="columns"
      :rows="allUsers">
      <template #u_name="{ data, row }">
        <PreviewModal
          class="cursor-pointer"
          :data-obj="row"
          @updated="onUserUpdate">
          {{ data }}
        </PreviewModal>
      </template>
    </Table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Table from '../../Molecules/Table.vue';
import Button from '../../Atoms/Button.vue';
import UserCreationModal from '../../Molecules/Modals/UserCreationModal.vue';
import PreviewModal from '../../Molecules/Modals/PreviewModal.vue';

export default {
    name: 'UsersPage',
    components: {
        Table,
        Button,
        UserCreationModal,
        PreviewModal
    },
    data() {
        return {
            showCreationModal: false
        };
    },
    computed: {
        ...mapGetters(['allUsers']),
        columns() {
            return [{
                label: 'ID',
                field: 'id',
                type: 'number'
            }, {
                label: 'Name',
                field: 'u_name',
            }, {
                label: 'Surname',
                field: 'u_surname',
            }, {
                label: 'Email',
                field: 'u_email',
            }, {
                label: 'Registration date',
                field: 'u_registration_date',
                dateInputFormat: 'yyyy-MM-dd',
                dateOutputFormat: 'yyyy-MM-dd',
                type: 'date'
            }, {
                label: 'Last log time',
                field: 'last_log_time',
                dateInputFormat: 'yyyy-MM-dd',
                dateOutputFormat: 'yyyy-MM-dd',
                type: 'datetime'
            },  {
                label: 'Risk level access',
                field: 'r_access_level',
                type: 'number'
            },  {
                label: 'Control level access',
                field: 'cntrl_access_level',
                type: 'number'
            }];
        },
    },
    methods: {
        ...mapActions(['addUser', 'updateUser']),
        onUserCreate(newUser) {
            this.showCreationModal = false;
            this.addUser(newUser);
        },
        onUserUpdate(updatedUser) {
            this.updateUser(updatedUser);
        },
    },
};
</script>