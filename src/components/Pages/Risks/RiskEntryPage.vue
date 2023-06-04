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

          <div class="mb-5">
            <div class="flex flex-wrap items-center w-full">
              <div class="basis-1/3 pr-3 flex-grow">
                <div class="mb-3">
                  <Title
                    title="Threat"
                    type="small" />

                  <MyMultiselect
                    :value="risk.threat_ids"
                    :options="threats"
                    label-prop="title"
                    value-prop="id"
                    @input="onRiskPropertyChange({threat_ids: $event})" />
                </div>

                <div>
                  <TextField
                    :value="risk.thr_comment"
                    @input="onRiskPropertyChange({thr_comment: $event})" />
                </div>
              </div>

              <div class="basis-1/3 pr-3 flex-grow">
                <div class="mb-3">
                  <Title
                    title="Level of threat"
                    type="small" />
                  <SingleSelect
                    :value="risk.thr_lvl_id"
                    :options="levelOfThreats"
                    label-prop="title"
                    value-prop="id"
                    @input="onRiskPropertyChange({thr_lvl_id: $event})" />
                </div>

                <div>
                  <TextField
                    :value="risk.thr_lvl_comment"
                    @input="onRiskPropertyChange({thr_lvl_comment: $event})" />
                </div>
              </div>

              <div class="basis-1/3 pr-3">
                <div class="mb-3">
                  <Title
                    title="Vulnerability"
                    type="small" />
                  
                  <MyMultiselect
                    :value="risk.vulnerability_ids"
                    :options="vulnerabilities"
                    label-prop="title"
                    value-prop="id"
                    @input="onRiskPropertyChange({vulnerability_ids: $event})"  />
                </div>

                <div>
                  <TextField
                    :value="risk.vul_comment"
                    @input="onRiskPropertyChange({vul_comment: $event})" />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="mb-2">
              <Title
                :title="riskPeriod.probability_title"
                type="medium" />
            </div>

            <div class="grid grid-cols-4 gap-4 mb-2">
              <div
                v-for="row in riskPeriod.probability_rows"
                :key="row.id">
                <Title
                  :title="row.label"
                  type="small" />

                <SingleSelect
                  :value="risk.probabilities?.[row.id] || []"
                  :options="row.probability_cols"
                  :value-prop="'id'"
                  @input="onRiskPropertyChange({probabilities: {...risk.probabilities, [row.id]: $event}})" />
              </div>
            </div>

            <div class="mb-2">
              <Title
                :title="riskPeriod.consequence_title"
                type="medium" />
            </div>

            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="row in riskPeriod.consequence_rows"
                :key="row.id">
                <Title
                  :title="row.label"
                  type="small" />

                <SingleSelect
                  :value="risk.consequences?.[row.id] || []"
                  :options="row.consequence_cols"
                  :open-direction="'top'"
                  :value-prop="'id'"
                  @input="onRiskPropertyChange({consequences: {...risk.consequences, [row.id]: $event}})" />
              </div>
            </div>
          </div>

          <div class="flex">
            <div class="mr-5">
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
        </div>
      </template>
    </ItemWrapper>
  </div>
</template>

<script>
import { getRisk, updateRisk, getRiskAttributes } from '../../../api/risks';
import { getCurrentPeriod } from '../../../api/risks/periods';

import ItemWrapper from '../../Molecules/ItemBlocks/ItemWrapper.vue';

import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import TextField from '../../Atoms/Fields/TextField.vue';
import Title from '../../Atoms/Title.vue';
import Button from '../../Atoms/Button.vue';
import Notification from '../../Atoms/Notification.vue';
import SingleSelect from '../../Atoms/Fields/SingleSelect.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';

export default {
    components: {
        ItemWrapper,
        LoadingIndicator,
        TextField,
        Title,
        Button,
        Notification,
        SingleSelect,
        MyMultiselect
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
            threats: [],
            vulnerabilities: [],
            levelOfThreats: [],
            riskPeriod: null,

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
        threatOptions() {
            return this.threats.map(threat => threat.label = threat.title);
        },
    },
    beforeMount() {
        this.loading = true;
        let promises = [
             this.getRisk(),
             this.getRiskAttributes(),
             this.getCurrentPeriod()
        ];
        
        Promise.all(promises)
            .finally(() => this.loading = false);
    },
    methods: {
        getRisk() {
            return getRisk(this.id).then(responce => {
                this.risk = responce.data;
            });
        },
        getCurrentPeriod() {
            return getCurrentPeriod()
                .then(period => {
                    this.riskPeriod = period;
                });
        },
        getRiskAttributes() {
            return getRiskAttributes()
                .then(({threats, vulnerabilities, levelOfThreats}) => {
                    this.threats = threats;
                    this.vulnerabilities = vulnerabilities;
                    this.levelOfThreats = levelOfThreats;
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
            // if (!this.risk.responsible.length) {
            //     this.notificationMessages.push('Risk should have at least one responsible person');
            // }

            return !this.notificationMessages.length;
        }
    },
};
</script>