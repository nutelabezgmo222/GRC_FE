<template>
  <div class="h-full">
    <Notification :message="notificationMessages" />
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <ItemWrapper
      v-else
      :header-props="riskHeaderProps"
      class="h-full"
      @propertyChanged="onRiskPropertyChange">
      <template #content>
        <div>
          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Description"
                type="small" />
            </p>
            <TextField
              :value="risk.description"
              @input="onRiskPropertyChange({description: $event})" />
          </div>

          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Status"
                type="small" />
            </p>
            <TextField
              :value="risk.status"
              @input="onRiskPropertyChange({status: $event})" />
          </div>

          <div class="mb-5 flex items-center">
            <div class="flex">
              <div class="mr-5">
                <Title
                  title="Threat"
                  type="small" />
                <SelectorField :options="[{label: 'test', value: 1}]"/>
              </div>

              <div class="mr-5">
                <Title
                  title="Level of threat"
                  type="small" />
                <SelectorField :options="[{label: 'test', value: 1}]"/>
              </div>

              <div>
                <Title
                  title="Vulnerability"
                  type="small" />
                <SelectorField :options="[{label: 'test', value: 1}]"/>
              </div>
            </div>

            <div class="flex flex-grow justify-center">
              <p v-if="risk.approved_by">
                This risk is <span class="font-bold">approved</span> 
                by {{ risk.approved_by.u_name }}
              </p>

              <p v-else>
                This risk is <span class="font-bold">unapproved</span>
              </p>
            </div>
          </div>

          <div>
            <Button
              v-if="risk.approved_by"
              type="remove">
              Unapprove 
            </Button>

            <Button
              v-else
              type="save">
              Approve 
            </Button>
          </div>
        </div>
      </template>
    </ItemWrapper>
  </div>
</template>

<script>
import { getRisk, updateRisk } from '../../../api/risks';

import ItemWrapper from '../../Molecules/ItemBlocks/ItemWrapper.vue';

import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import TextField from '../../Atoms/Fields/TextField.vue';
import SelectorField from '../../Atoms/Fields/SelectorField.vue';
import Title from '../../Atoms/Title.vue';
import Button from '../../Atoms/Button.vue';
import Notification from '../../Atoms/Notification.vue';

export default {
    components: {
        ItemWrapper,
        LoadingIndicator,
        TextField,
        SelectorField,
        Title,
        Button,
        Notification
    },
    props: {
        id: {
            type: [String, Number],
            required: true,
            default: null,
            note: 'risk id'
        },
    },
    data() {
        return {
            risk: null,
            loading: false,
            notificationMessages: []
        };
    },
    computed: {
        riskHeaderProps() {
            return {
                id: this.risk.id,
                title: this.risk.title
            };
        },
    },
    beforeMount() {
        this.getRisk();
    },
    methods: {
        getRisk() {
            this.loading = true;
            return getRisk(this.id).then(responce => {
                this.risk = responce.data;
                this.loading = false;
            });
        },
        onRiskPropertyChange(props) {
            this.risk = {
                ...this.risk,
                ...props
            };

            if (!this.validate()) return;

            return updateRisk(this.risk.id, props);
        },
        validate() {
            this.notificationMessages = [];

            if (!this.risk.title) {
                this.notificationMessages.push('You can`t save risk with empty title');
            }
            if (!this.risk.responsible.length) {
                this.notificationMessages.push('Risk should have at least one responsible person');
            }

            return !this.notificationMessages.length;
        }
    },
};
</script>