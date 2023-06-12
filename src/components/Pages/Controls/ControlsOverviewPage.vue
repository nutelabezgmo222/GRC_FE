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
          <span>Create new Control</span>
      </Button>

      <ControlCreationModal
        :show="showCreationModal"
        @created="onControlCreate"
        @cancel="showCreationModal = false"/>
    </div>

    <div>
      <LoadingIndicator v-if="loading"/>

      <div
        v-else
        class="relative">
        <div v-if="!groupBy">
          <ItemsList
            v-if="filteredControls.length"
            :items="filteredControls"
            :items-type="ObjectTypes.CONTROL" />
          
          <div
            v-else
            class="text-2xl font-semibold italic text-center">
            No search result
          </div>
        </div>

        <div v-else>
          <div
            v-for="(group, idx) in filteredAndGroupedControls"
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
              :items-type="ObjectTypes.CONTROL" />

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
import { getControls } from '../../../api/controls';

import ItemsList from '../../Molecules/Items/ItemsList.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import Button from '../../Atoms/Button.vue';
import Notification from '../../Atoms/Notification.vue';
import ControlCreationModal from '../../Molecules/Modals/ControlCreationModal.vue';
import FiltersMenu from '../../Molecules/FiltersMenu.vue';

import { ObjectTypes } from '../../../constants/ObjectTypes';
import { Group } from '../../../constants';
import { filtersMixin } from '../../../mixins/filtersMixin';

export default {
    name: 'ControlsOverviewPage',
    components: {
        ItemsList,
        LoadingIndicator,
        Button,
        Notification,
        ControlCreationModal,
        FiltersMenu
    },
    props: {
        filter: {
            type: String,
            required: false,
            default: ''
        },
    },
    mixins: [filtersMixin],
    data() {
        return {
            loading: false,
            showCreationModal: false,
            controls: [],
            ObjectTypes
        };
    },
    computed: {
        ...mapGetters(['user', 'controlUsers', 'allUsers']),
        filteredAndGroupedControls() {
            if (!this.groupBy) return this.filteredControls;
            let result = [{
                id: 'out_of_any_group',
                title: 'Out of any group',
                color: '#676e7a',
                items: []
            }];

            if (this.groupBy === Group.RESPONSIBLE) {
                this.filteredControls.forEach(control => {
                    if (!control.responsibleIds?.length) {
                        result[0].items.push(control);
                        return;
                    };
                    control.responsibleIds.forEach(responsibleId => {
                        let responsible = this.allUsers.find(user => user.id === responsibleId);
                        let groupIdx = result.findIndex(group => group.id === responsibleId);

                        if (groupIdx !== -1) {
                            result[groupIdx].items.push(control);
                        } else {
                            result.push({
                                id: responsibleId,
                                title: responsible.full_name,
                                items: [control]
                            });
                        }
                    });
                });
            }

            if (this.groupBy === Group.REVIEWER) {
                this.filteredControls.forEach(control => {
                    if (!control.reviewer) {
                        result[0].items.push(control);
                        return;
                    };
                    let reviewer = this.allUsers.find(user => user.id === control.reviewer);
                    let groupIdx = result.findIndex(group => group.id === control.reviewer);
                    if (groupIdx !== -1) {
                        result[groupIdx].items.push(control);
                    } else {
                        result.push({
                            id: control.reviewer,
                            title: reviewer.full_name,
                            items: [control]
                        });
                    }
                });
            }

            return result;
        },
        filteredControls() {
            let result = this.controls;

            if(this.filter === 'my') {
                result = result.filter(control => control.responsibleIds.includes(this.user.id));
            }
            if(this.filter === 'reviews') {
                result = result.filter(control => control.reviewer === this.user.id);
            }
            if (this.searchString) {
                result = result.filter(control => {
                     return control.title.toLowerCase().includes(this.searchString.toLowerCase());
                });
            }
            if (this.selectedFilters[Group.RESPONSIBLE]?.length) {
                result = result.filter(control => control.responsibleIds.some(id => {
                    return this.selectedFilters[Group.RESPONSIBLE].includes(id);
                }));
            }

            return result;
        },
        groupByOptions() {
            return [{
                value: Group.REVIEWER,
                label: 'Control reviewer'
            }, {
                value: Group.RESPONSIBLE,
                label: 'Control responsible'
            }];
        },
        filterOptions() {
            return [{
                groupId: Group.RESPONSIBLE,
                groupTitle: 'Responsibles',
                items: this.controlUsers.map(user => ({
                    value: user.id,
                    label: user.full_name
                }))
            }];
        },
    },
    beforeMount() {
        this.getControls();
    },
    methods: {
        getControls() {
            this.loading = true;

            return getControls()
                .then(({list}) => {
                    this.controls = list;
                    this.loading = false;
                });
        },
        onControlCreate(newControl) {
            this.controls.push(newControl);
            this.showCreationModal = false;
        },
    },
};
</script>