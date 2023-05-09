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
        @cancel="showCreationModal = false"/>
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