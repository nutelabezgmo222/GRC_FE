<template>
  <div class="h-full">
    <Notification :message="notificationMessages" />
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <ItemWrapper
      v-else
      :header-props="controlHeaderProps"
      class="h-full"
      @propertyChanged="onControlPropertyChange">
      <template #content>
        <div>
          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Description"
                type="small" />
            </p>
            <TextField
              :value="control.description"
              @input="onControlPropertyChange({description: $event})" />
          </div>

          <div class="mb-5">
            <p class="mb-3">
              <Title
                title="Expected evidence"
                type="small" />
            </p>
            <TextField
              :value="control.expected_evidence"
              @input="onControlPropertyChange({expected_evidence: $event})" />
          </div>
        </div>
      </template>
    </ItemWrapper>
  </div>
</template>

<script>
import { getControl, updateControl } from '../../../api/controls';

import ItemWrapper from '../../Molecules/ItemBlocks/ItemWrapper.vue';

import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import TextField from '../../Atoms/Fields/TextField.vue';
import Title from '../../Atoms/Title.vue';
import Notification from '../../Atoms/Notification.vue';

export default {
    components: {
        ItemWrapper,
        LoadingIndicator,
        TextField,
        Title,
        Notification
    },
    props: {
        id: {
            type: [String, Number],
            required: true,
            default: null,
            note: 'control id'
        },
    },
    data() {
        return {
            control: null,
            loading: false,
            notificationMessages: []
        };
    },
    computed: {
        controlHeaderProps() {
            return {
                id: this.control.id,
                title: this.control.title
            };
        },
    },
    beforeMount() {
        this.getControl();
    },
    methods: {
        getControl() {
            this.loading = true;
            return getControl(this.id).then(responce => {
                this.control = responce.data;
                this.loading = false;
            });
        },
        onControlPropertyChange(props) {
            this.control = {
                ...this.control,
                ...props
            };

            if (!this.validate()) return;

            return updateControl(this.control.id, props);
        },
        validate() {
            this.notificationMessages = [];

            if (!this.control.title) {
                this.notificationMessages.push('You can`t save control with empty title');
            }
            // if (!this.control.responsibles?.length) {
            //     this.notificationMessages.push('Control should have at least one responsible person');
            // }

            return !this.notificationMessages.length;
        }
    },
};
</script>