<template>
  <div class="h-full">
    <Notification :message="notificationMessages" />
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <ItemWrapper
      v-else
      :header-props="riskHeaderProps"
      :selected-tab="selectedTab"
      class="h-full"
      @tabClick="selectedTab = $event"
      @propertyChanged="onRiskPropertyChange">
      <template #content>
        <div v-if="selectedComponent">
          <component
            :is="selectedComponent"
            :data="risk"
            @propertyChanged="onRiskPropertyChange" />
        </div>
      </template>
    </ItemWrapper>
  </div>
</template>

<script>
import { getRisk, updateRisk } from '../../../api/risks';

import ItemWrapper from '../../Molecules/ItemBlocks/ItemWrapper.vue';
import Notification from '../../Atoms/Notification.vue';
import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import RiskDescriptionPage from '../../Pages/Risks/RiskDescriptionPage.vue';
import LinksPage from '../../Pages/General/LinksPage.vue';

import { Tabs } from '../../../constants';

export default {
    components: {
        ItemWrapper,
        LoadingIndicator,
        Notification,
        RiskDescriptionPage,
        LinksPage
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
            loading: false,
            selectedTab: Tabs.DESCRIPTION.key,
            notificationMessages: []
        };
    },
    computed: {
        selectedComponent() {
            switch(this.selectedTab) {
                case Tabs.DESCRIPTION.key:
                    return RiskDescriptionPage;
                case Tabs.LINKS.key:
                    return LinksPage;
            }
        },
        riskHeaderProps() {
            return {
                id: this.risk.id,
                title: this.risk.title,
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
                this.getRisk(),
            ];
            
            Promise.all(promises)
                .finally(() => this.loading = false);
        },
        getRisk() {
            return getRisk(this.id).then(responce => {
                this.risk = responce.data;
            });
        },
        onRiskPropertyChange(props) {
            this.risk = {
                ...this.risk,
                ...props
            };

            if (!this.validate()) return;

            return updateRisk(this.risk.id, props)
                .then((updatedRisk) => {
                    this.risk = {
                        ...this.risk,
                        ...updatedRisk
                    };
                });
        },
        validate() {
            this.notificationMessages = [];

            if (!this.risk.title) {
                this.notificationMessages.push('You can`t save risk with empty title');
            }
            if (!this.risk.responsibleIds.length) {
                this.notificationMessages.push('Risk should have at least one responsible person');
            }

            return !this.notificationMessages.length;
        }
    },
};
</script>