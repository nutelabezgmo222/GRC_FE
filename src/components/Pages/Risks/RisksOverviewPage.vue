<template>
  <div>
    <div class="mb-4">
      <FiltersMenu
        :group-by="groupByOptions"
        :filter-by="filterOptions"
        @searchStringChange="searchString = $event"
        @filtersChange="onFiltersChange"
        @groupByChange="groupBy = $event"
        @reset="onFiltersReset" />
    </div>

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
        <div v-if="!groupBy">
          <ItemsList
            v-if="filteredRisks.length"
            :items="filteredRisks"
            :items-type="ObjectTypes.RISK" />
          
          <div
            v-else
            class="text-2xl font-semibold italic text-center">
            No search result
          </div>
        </div>

        <div v-else>
          <div
            v-for="(group, idx) in filteredAndGroupedRisks"
            :key="idx"
            :style="{backgroundColor: group.color ? `${group.color}35` : ''}"
            class="p-4 mb-2">
            <p
              class="text-xl font-semibold mb-3 sticky top-0"
              :style="{color: group.color || ''}">
              {{ group.title }}
            </p>

            <ItemsList
              v-if="group.items.length"
              :items="group.items"
              :items-type="ObjectTypes.RISK" />

            <div
              v-else
              class="text-2xl font-semibold italic text-center">
              No search result
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCurrentPeriod } from '../../../api/risks/periods';
import { getRisks } from '../../../api/risks';

import ItemsList from '../../Molecules/Items/ItemsList.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import Button from '../../Atoms/Button.vue';
import RiskCreationModal from '../../Molecules/Modals/RiskCreationModal.vue';
import Notification from '../../Atoms/Notification.vue';
import FiltersMenu from '../../Molecules/FiltersMenu.vue';

import { ObjectTypes } from '../../../constants/ObjectTypes';
import { Group } from '../../../constants';
import { filtersMixin } from '../../../mixins/filtersMixin';

export default {
    components: {
        ItemsList,
        LoadingIndicator,
        Button,
        RiskCreationModal,
        Notification,
        FiltersMenu
    },
    mixins: [filtersMixin],
    data() {
        return {
            loading: false,
            showCreationModal: false,
            risks: [],
            currentPeriod: null,
            
            ObjectTypes,
            Group
        };
    },
    computed: {
        ...mapGetters(['allUsers', 'riskUsers']),
        filteredAndGroupedRisks() {
            if (!this.groupBy) return this.filteredRisks;
            let result = [{
                id: 'out_of_any_group',
                title: 'Out of any group',
                color: '#676e7a',
                items: []
            }];

            if (this.groupBy === Group.RESPONSIBLE) {
                this.filteredRisks.forEach(risk => {
                    if (!risk.responsibleIds?.length) {
                        result[0].items.push(risk);
                        return;
                    };
                    risk.responsibleIds.forEach(responsibleId => {
                        let responsible = this.allUsers.find(user => user.id === responsibleId);
                        let groupIdx = result.findIndex(group => group.id === responsibleId);

                        if (groupIdx !== -1) {
                            result[groupIdx].items.push(risk);
                        } else {
                            result.push({
                                id: responsibleId,
                                title: responsible.full_name,
                                items: [risk]
                            });
                        }
                    });
                });
            }

            if (this.groupBy === Group.ASSESSMENT) {
                this.currentPeriod.assessment.forEach(assessmenRow => {
                    result.push({
                        ...assessmenRow,
                        items: []
                    });
                });
                this.filteredRisks.forEach(risk => {
                    if (!risk.assessmentGroup || risk.assessmentGroup === -1) {
                        result[0].items.push(risk);
                        return;
                    };
                    let groupIdx = result.findIndex(group => group.id === risk.assessmentGroup);
                    result[groupIdx] && result[groupIdx].items.push(risk);
                });
            }

            return result;
        },
        filteredRisks() {
            let result = this.risks;

            if (this.searchString) {
                result = result.filter(risk => {
                     return risk.title.toLowerCase().includes(this.searchString.toLowerCase());
                });
            }
            if (this.selectedFilters[Group.RESPONSIBLE]?.length) {
                result = result.filter(risk => risk.responsibleIds.some(id => {
                    return this.selectedFilters[Group.RESPONSIBLE].includes(id);
                }));
            }

            return result;
        },
        groupByOptions() {
            return [{
                value: Group.ASSESSMENT,
                label: 'Risk assessment'
            }, {
                value: Group.RESPONSIBLE,
                label: 'Risk responsible'
            }];
        },
        filterOptions() {
            return [{
                groupId: Group.RESPONSIBLE,
                groupTitle: 'Responsibles',
                items: this.riskUsers.map(user => ({
                    value: user.id,
                    label: user.full_name
                }))
            }];
        },
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