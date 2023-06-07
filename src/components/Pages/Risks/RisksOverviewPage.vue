<template>
  <div>
    <div class="mb-4">
      <Button
        type="save"
        @click="showCreationModal = true">
          <span>Create new Risk</span>
      </Button>

      <RiskCreationModal
        :show="showCreationModal"
        @created="onRiskCreate"
        @cancel="showCreationModal = false"/>
    </div>

    <div>
      <LoadingIndicator v-if="loading"/>

      <div
        v-else
        class="relative">
        <div
          v-for="(group, idx) in risksByAssessmentGroup"
          :key="idx"
          :style="{backgroundColor: `${group.color}35`}"
          class="p-4">
          <p
            class="text-xl font-semibold mb-3 sticky top-0"
            :style="{color: group.color}">
            {{ group.title }}
          </p>

          <ItemsList
            v-if="group.items.length"
            :items="group.items"
            :items-type="ObjectTypes.RISK" />

          <p v-else>No items to show</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentPeriod } from '../../../api/risks/periods';
import { getRisks } from '../../../api/risks';

import ItemsList from '../../Molecules/Items/ItemsList.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import Button from '../../Atoms/Button.vue';
import RiskCreationModal from '../../Molecules/Modals/RiskCreationModal.vue';
import Notification from '../../Atoms/Notification.vue';

import { ObjectTypes } from '../../../constants/ObjectTypes';

export default {
    components: {
        ItemsList,
        LoadingIndicator,
        Button,
        RiskCreationModal,
        Notification
    },
    data() {
        return {
            loading: false,
            showCreationModal: false,
            risks: [],
            currentPeriod: null,
            ObjectTypes
        };
    },
    computed: {
        risksByAssessmentGroup() {
            if (!this.currentPeriod?.assessment) return [];
            const result = [{
                id: 'no_assessment',
                title: 'No assessment',
                color: '#676e7a',
                items: []
            }];

            this.currentPeriod.assessment.forEach(assessmenRow => {
                result.push({
                    ...assessmenRow,
                    items: []
                });
            });
            this.risks.forEach(risk => {
                if (!risk.assessmentGroup || risk.assessmentGroup === -1) {
                    result[0].items.push(risk);
                    return;
                };
                let groupIdx = result.findIndex(group => group.id === risk.assessmentGroup);
                result[groupIdx].items.push(risk);
            });

            return result;
        }
    },
    beforeMount() {
        this.loading = true;
        let promises = [
            this.getRisks(),
            this.getCurrentPeriod()
        ];

        return Promise.all(promises)
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        getRisks() {
            return getRisks()
                .then(({list}) => {
                    this.risks = list;
                });
        },
        getCurrentPeriod() {
            return getCurrentPeriod()
                .then(period => {
                    this.currentPeriod = period;
                });
        },
        onRiskCreate(newRisk) {
            this.risks.push(newRisk);
            this.showCreationModal = false;
        },
    },
};
</script>