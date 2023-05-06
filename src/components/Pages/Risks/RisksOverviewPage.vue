<template>
  <div>
    <div class="mb-4">
      RiskOverviewPage
    </div>

    <div>
      <LoadingIndicator v-if="loading"/>

      <ItemsList
        v-else
        :items="risks"
        :items-type="ObjectTypes.RISK" />
    </div>
  </div>
</template>

<script>
import { getRisks } from '../../../api/risks';

import ItemsList from '../../Molecules/Items/ItemsList.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';

import { ObjectTypes } from '../../../constants/ObjectTypes';

export default {
    components: {
        ItemsList,
        LoadingIndicator,
    },
    data() {
        return {
            loading: false,
            risks: [],
            ObjectTypes
        };
    },
    beforeMount() {
        this.getRisks();
    },
    methods: {
        getRisks() {
            this.loading = true;

            return getRisks()
                .then(({list}) => {
                    this.risks = list;
                    this.loading = false;
                });
        },
    },
};
</script>