<template>
  <div class="h-full">
    <Notification :message="notificationMessages" />
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <ItemWrapper
      v-else
      :header-props="controlHeaderProps"
      :selected-tab="selectedTab"
      class="h-full"
      @tabClick="selectedTab = $event"
      @propertyChanged="onControlPropertyChange">
      <template #content>
        <div
          v-if="selectedComponent"
          class="h-full">
          <component
            :is="selectedComponent"
            :data="control"
            @propertyChanged="onControlPropertyChange" />
        </div>
      </template>
    </ItemWrapper>
  </div>
</template>

<script>
import { getControl, updateControl } from '../../../api/controls';

import ItemWrapper from '../../Molecules/ItemBlocks/ItemWrapper.vue';

import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import Notification from '../../Atoms/Notification.vue';
import ControlDescriptionPage from './ControlDescriptionPage.vue';
import LinksPage from '../General/LinksPage.vue';

import { Tabs } from '../../../constants';

export default {
    components: {
        ItemWrapper,
        LoadingIndicator,
        Notification,
        ControlDescriptionPage
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
            selectedTab: Tabs.DESCRIPTION.key,
            notificationMessages: []
        };
    },
    computed: {
        selectedComponent() {
            switch(this.selectedTab) {
                case Tabs.DESCRIPTION.key:
                    return ControlDescriptionPage;
                case Tabs.LINKS.key:
                    return LinksPage;
            }
        },
        controlHeaderProps() {
            return {
                id: this.control.id,
                title: this.control.title,
                tabs: [Tabs.DESCRIPTION, Tabs.LINKS]
            };
        },
    },
    watch: {
        id() {
            this.refresh();
        },
    },
    beforeMount() {
        this.loadData();
    },
    methods: {
        refresh() {
            this.loadData();
        },
        loadData() {
            this.loading = true;
            let promises = [
                this.getControl(),
            ];
            
            Promise.all(promises)
                .finally(() => this.loading = false);
        },
        getControl() {
            return getControl(this.id).then(responce => {
                this.control = responce.data;
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