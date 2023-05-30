<template>
  <div>
    <Notification
      :message="notificationMessage"
      @dismiss="notificationMessage = ''" />
    <Modal
      :show="showModal"
      :title="modalHeader"
      @submit="onModalSubmit"
      @cancel="onModalDismiss">
      <template #body>
        <div>
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
          </div>
        </div>
      </template>
    </Modal>

    <div class="pr-4 flex">
      <div
        v-for="(group, idx) in groups"
        :key="idx"
        class="mr-5 flex-grow">
        <div class="mb-4 px-10 flex items-center justify-between">
          <Title
            type="medium"
            :title="group.title" />

          <FeatherIcon
            class="font-bold text-light-blue cursor-pointer"
            width="40"
            height="40"
            stroke-width="2"
            icon="plus"
            @click="onCreateNewItem(group.type)" />
        </div>
        
        <Table
          :columns="columns"
          :rows="group.items">
          <template #title="{ data, row }">
            <div
              class="cursor-pointer"
              @click="editItem(row, group.type)">
              {{ data }}
            </div>
          </template>

          <template #delete="{ row }">
            <div
              class="cursor-pointer flex items-center justify-center"
              @click="deleteRiskAttribute(row.id, group.type)">
              <FeatherIcon
                class="font-bold text-main-orange cursor-pointer"
                stroke-width="2"
                width="20"
                height="20"
                icon="x" />
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import {
    getRiskAttributes,
    createRiskAttribute,
    patchRiskAttribute,
    deleteRiskAttribute
} from '../../../../api/risks';
import Button from '../../../Atoms/Button.vue';
import Table from '../../../Molecules/Table.vue';
import FeatherIcon from '../../../Atoms/FeatherIcon.vue';
import Modal from '../../../Molecules/Modals/Modal.vue';
import LoadingIndicator from '../../../Atoms/LoadingIndicator.vue';
import Title from '../../../Atoms/Title.vue';
import InputField from '../../../Atoms/Fields/InputField.vue';
import Notification from '../../../Atoms/Notification.vue';

const Types = {
    VULNERABILITY: 'vulnerabilities',
    THREAT: 'threats',
    LEVEL_OF_THREAT: 'level_of_threats'
};

export default {
    name: 'ThreatsPage',
    components: {
        Button,
        Table,
        FeatherIcon,
        Modal,
        LoadingIndicator,
        Title,
        InputField,
        Notification
    },
    data() {
        return {
            threats: [],
            vulnerabilities: [],
            level_of_threats: [],

            title: '',
            selectedId: '',
            selectedType: null,
            showModal: false,
            loading: false,
            notificationMessage: '',
            Types
        };
    },
    computed: {
        columns() {
            return [{
                label: 'ID',
                field: 'id',
                type: 'number'
            }, {
                label: 'Title',
                field: 'title',
            }, {
                label: '',
                field: 'delete',
            }];
        },
        groups() {
            return [{
                items: this.threats,
                type: Types.THREAT,
                title: 'Threat'
            }, {
                items: this.vulnerabilities,
                type: Types.VULNERABILITY,
                title: 'Vulnerability'
            }, {
                items: this.level_of_threats,
                type: Types.LEVEL_OF_THREAT,
                title: 'Level of threat'
            }];
        },
        modalHeader() {
            if (!this.selectedType) return '';
            const selectedGroupTitle = this.groups.find(group => group.type === this.selectedType)?.title || '';

            if (this.selectedId) {
                return `Update existing ${selectedGroupTitle}`;
            }

            return `Create new ${selectedGroupTitle}`;
        },
    },
    mounted() {
        this.getRiskAttributes();
    },
    methods: {
        getRiskAttributes() {
            return getRiskAttributes()
                .then(({threats, vulnerabilities, levelOfThreats}) => {
                    this.threats = threats;
                    this.vulnerabilities = vulnerabilities;
                    this.level_of_threats = levelOfThreats;
                });
        },
        onCreateNewItem(type) {
            this.selectedType = type;
            this.showModal = true;
        },
        editItem(data, type) {
            this.title = data.title;
            this.selectedId = data.id;
            this.selectedType = type;
            this.showModal = true;
        },
        onModalSubmit() {
            if (!this.validate()) return;

            let promise = Promise.resolve();

            if (!this.selectedId) {
                promise = this.createRiskAttribute();
            } else {
                promise = this.updateRiskAttribute();
            }

            return promise.then(() => {
                this.title = '';
                this.selectedId = '';
                this.showModal = false;
            });
        },
        createRiskAttribute() {
            const data = {
                type: this.selectedType,
                title: this.title
            };

            this.loading = true;
            return createRiskAttribute(data)
                .then(newItem => {
                    const type = newItem.type;

                    if (this[type]) {
                        this[type].push(newItem);
                    }
                })
                .finally(() => this.loading = false);
        },
        updateRiskAttribute() {
            const data = { title: this.title };

            this.loading = true;
            return patchRiskAttribute(this.selectedId, this.selectedType, data)
                .then(updatedItem => {
                    const {type, id} = updatedItem;

                    if (this[type]) {
                        this[type] = this[type].map(item => {
                            return item.id === id ? updatedItem : item;
                        });
                    }
                })
                .finally(() => this.loading = false);
        },
        deleteRiskAttribute(id, type) {
            this.loading = true;
            return deleteRiskAttribute(id, type)
                .then(() => {
                    this[type] = this[type].filter(item => item.id !== id);
                })
                .finally(() => this.loading = false);
        },
        onModalDismiss() {
            this.title = '';
            this.selectedId = '';
            this.showModal = false;
        },
        validate() {
            this.notificationMessage = '';

            if (!this.title) {
                this.notificationMessage = 'Title field can`t be empty';
                return false;
            }
            const duplicate = this[this.selectedType].find(item => {
                return item.title === this.title && item.id !== this.selectedId;
            });
            if (duplicate) {
                this.notificationMessage = 'There is already item with such title';
                return false;
            }
            
            return !this.notificationMessage;
        },
    },
};
</script>