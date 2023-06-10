<template>
  <div>
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <div
      v-else
      class="flex w-full">
      <div class="w-8/10">
        <div class="flex mb-5">
          <div class="mr-5 flex-grow">
            <p class="mb-3">
              <Title
                title="Description"
                type="small" />
            </p>
            <TextField
              :value="data.description"
              @input="onRiskPropertyChange({description: $event})" />
          </div>

          <div class="flex-grow">
            <p class="mb-3">
              <Title
                title="Status"
                type="small" />
            </p>
            <TextField
              :value="data.status"
              @input="onRiskPropertyChange({status: $event})" />
          </div>
        </div>

        <div class="mb-5">
          <div class="flex flex-wrap items-center w-full">
            <div class="basis-1/3 pr-3 flex-grow">
              <div class="mb-3">
                <Title
                  title="Threat"
                  type="small" />

                <MyMultiselect
                  :value="data.threat_ids"
                  :options="threats"
                  label-prop="title"
                  value-prop="id"
                  @input="onRiskPropertyChange({threat_ids: $event})" />
              </div>

              <div>
                <TextField
                  :value="data.thr_comment"
                  @input="onRiskPropertyChange({thr_comment: $event})" />
              </div>
            </div>

            <div class="basis-1/3 pr-3 flex-grow">
              <div class="mb-3">
                <Title
                  title="Level of threat"
                  type="small" />
                <SingleSelect
                  :value="data.thr_lvl_id"
                  :options="levelOfThreats"
                  label-prop="title"
                  value-prop="id"
                  @input="onRiskPropertyChange({thr_lvl_id: $event})" />
              </div>

              <div>
                <TextField
                  :value="data.thr_lvl_comment"
                  @input="onRiskPropertyChange({thr_lvl_comment: $event})" />
              </div>
            </div>

            <div class="basis-1/3">
              <div class="mb-3">
                <Title
                  title="Vulnerability"
                  type="small" />
                
                <MyMultiselect
                  :value="data.vulnerability_ids"
                  :options="vulnerabilities"
                  label-prop="title"
                  value-prop="id"
                  @input="onRiskPropertyChange({vulnerability_ids: $event})"  />
              </div>

              <div>
                <TextField
                  :value="data.vul_comment"
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

          <div class="grid grid-cols-3 gap-4 mb-2">
            <div
              v-for="row in riskPeriod.probability_rows"
              :key="row.id">
              <Title
                :title="row.label"
                type="small" />

              <SingleSelect
                :value="data.probabilities?.[row.id] || []"
                :options="row.probability_cols"
                :value-prop="'id'"
                @input="onRiskPropertyChange({probabilities: {...data.probabilities, [row.id]: $event}})" />
            </div>
          </div>

          <div class="mb-2">
            <Title
              :title="riskPeriod.consequence_title"
              type="medium" />
          </div>

          <div class="grid grid-cols-3 gap-4 mb-2">
            <div
              v-for="row in riskPeriod.consequence_rows"
              :key="row.id">
              <Title
                :title="row.label"
                type="small" />

              <SingleSelect
                :value="data.consequences?.[row.id] || []"
                :options="row.consequence_cols"
                :open-direction="'top'"
                :value-prop="'id'"
                @input="onRiskPropertyChange({consequences: {...data.consequences, [row.id]: $event}})" />
            </div>
          </div>

          <div>
            <p class="text-xl font-semibold">
              Score value: {{ data.score }}
            </p>
          </div>
        </div>

        <div class="flex">
          <div class="mr-5">
            <Button
              v-if="data.approved_by"
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
            <p v-if="data.approved_by">
              This risk is <span class="font-bold">approved</span> 
              by {{ data.approved_by.u_name }}
            </p>

            <p v-else>
              This risk is <span class="font-bold">unapproved</span>
            </p>
          </div>
        </div>
      </div>

      <div class="w-2/10 border border-main-gray ml-4 rounded-md shadow-md p-5">
        <div>
          <div class="mb-3">
            <Title
              title="Responsible"
              class="mb-3"
              type="small" />
            
            <MyMultiselect
              :value="data.responsibleIds"
              :options="riskUserOptions"
              @input="onRiskPropertyChange({responsibleIds: $event})"  />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getRiskAttributes } from '../../../api/risks';
import { getCurrentPeriod } from '../../../api/risks/periods';

import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import TextField from '../../Atoms/Fields/TextField.vue';
import Title from '../../Atoms/Title.vue';
import Button from '../../Atoms/Button.vue';
import Notification from '../../Atoms/Notification.vue';
import SingleSelect from '../../Atoms/Fields/SingleSelect.vue';
import MyMultiselect from '../../Atoms/Fields/MyMultiselect.vue';

export default {
    name: 'RiskDescriptionPage',
    components: {
        LoadingIndicator,
        TextField,
        Title,
        Button,
        Notification,
        SingleSelect,
        MyMultiselect
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
            threats: [],
            vulnerabilities: [],
            levelOfThreats: [],
            riskPeriod: null,

            loading: false,
        };
    },
    computed: {
        ...mapGetters(['riskUsers']),
        riskUserOptions() {
            if (!this.riskUsers) return [];
            return this.riskUsers.map(user => ({
                value: user.id,
                label: user.full_name
            }));
        },
        threatOptions() {
            return this.threats.map(threat => threat.label = threat.title);
        },
    },
    beforeMount() {
        this.loading = true;
        let promises = [
             this.getRiskAttributes(),
             this.getCurrentPeriod()
        ];
        
        Promise.all(promises)
            .finally(() => this.loading = false);
    },
    methods: {
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
            this.$emit('propertyChanged', props);
        },
    },
};
</script>