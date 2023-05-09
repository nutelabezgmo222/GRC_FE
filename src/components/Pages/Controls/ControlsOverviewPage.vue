<template>
  <div>
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

      <ItemsList
        v-else
        :items="controls"
        :items-type="ObjectTypes.CONTROL" />
    </div>
  </div>
</template>

<script>
import { getControls } from '../../../api/controls';

import ItemsList from '../../Molecules/Items/ItemsList.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import Button from '../../Atoms/Button.vue';
import Notification from '../../Atoms/Notification.vue';
import ControlCreationModal from '../../Molecules/Modals/ControlCreationModal.vue';

import { ObjectTypes } from '../../../constants/ObjectTypes';

export default {
    components: {
    ItemsList,
    LoadingIndicator,
    Button,
    Notification,
    ControlCreationModal
},
    data() {
        return {
            loading: false,
            showCreationModal: false,
            controls: [],
            ObjectTypes
        };
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