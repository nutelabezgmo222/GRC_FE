<template>
  <div>
    <Notification :message="notificationMessages" />
    <LoadingIndicator v-if="loading" />

    <div
      v-else-if="selectedPeriod"
      class="flex">
      <div class="w-7/10">
        <div
          v-if="!creationMode"
          class="flex justify-between">
          <div>
            <div class="flex items-end mb-4">
              <div class="mr-3">
                Selected Period:
              </div>

              <Title
                :title="selectedPeriod.title"
                type="medium" />
            </div>

            <div
              class="flex items-end mb-10">
              <div class="mr-3">
                Status:
              </div>

              <div
                class="text-xl font-semibold"
                :class="selectedPeriod.current ? 'text-dark-green' : 'text-main-orange'">
                {{ selectedPeriod.current ? 'Current' : 'Closed' }}
              </div>
            </div>
          </div>

          <div>
            <Button
              type="save"
              class="mr-5"
              @click="openNewPeriod">
              + Open new period
            </Button>
          </div>
        </div>

        <div v-else>
          <div class="pl-10 flex items-center">
            <div
              v-if="creationMode"
              class="mr-3">
              New period title:
            </div>

            <div class="text-2xl">
              <InputField
                :value="selectedPeriod.title"
                @input="selectedPeriod.title = $event" />
            </div>
          </div>
        </div>


        <div :key="selectedPeriod.id || 1">
          <div class="pl-10 flex items-center">
            <div
              v-if="creationMode"
              class="mr-3">
              Probability Title:
            </div>

            <div class="text-2xl">
              <InputField
                :value="selectedPeriod.probability_title"
                :disabled="!creationMode"
                @input="selectedPeriod.probability_title = $event" />
            </div>
          </div>

          <ExpandableTable
            :rows="probabilityRows"
            :min-cols-number="3"
            :min-rows-number="1"
            :read-only="!creationMode"
            @tableChanged="probabilityTable = $event" />
        </div>

        <div :key="selectedPeriod.id || 1">
          <div class="pl-10 flex items-center">
            <div
              v-if="creationMode"
              class="mr-3">
              Consequence Title:
            </div>

            <div class="text-2xl">
              <InputField
                :value="selectedPeriod.consequence_title"
                :disabled="!creationMode"
                @input="selectedPeriod.consequence_title = $event" />
            </div>
          </div>

          <ExpandableTable
            :rows="consequenceRows"
            :min-cols-number="3"
            :min-rows-number="1"
            :read-only="!creationMode"
            @tableChanged="consequenceTable = $event" />
        </div>

        <Button
          v-if="creationMode"
          type="save"
          class="mt-4"
          @click="savePeriod">
          Open new period and close previous
        </Button>
      </div>

      <div class="w-3/10 bg-white rounded-md p-5">
        <div class="flex justify-center mb-4">
          <Title
            title="All periods list"
            type="medium" />
        </div>

        <div>
          <div
            v-for="period in periods"
            :key="period.id"
            class="p-2 border border-black mb-1 cursor-pointer hover:bg-light-green transition"
            :class="{'bg-light-green text-dark-green': selectedPeriod.id === period.id}"
            @click="onPeriodClick(period)">
            <span>{{ period.title }}</span>

            <span
              v-if="currentPeriod.id === period.id"
              class="italic">
              - Current
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRiskPeriods, createRiskPeriod } from '../../../../api/risks/periods';
import Title from '../../../Atoms/Title.vue';
import LoadingIndicator from '../../../Atoms/LoadingIndicator.vue';
import ExpandableTable from '../../../Atoms/ExpandableTable.vue';
import InputField from '../../../Atoms/Fields/InputField.vue';
import Button from '../../../Atoms/Button.vue';
import Notification from '../../../Atoms/Notification.vue';

export default {
    name: 'RiskPeriodsPage',
    components: {
        Title,
        LoadingIndicator,
        ExpandableTable,
        InputField,
        Button,
        Notification
    },
    data() {
        return {
            periods: [],
            selectedPeriod: null,
            loading: false,
            probabilityTable: [],
            consequenceTable: [],
            notificationMessages: [],
            creationMode: false,
        };
    },
    computed: {
        currentPeriod() {
            return this.periods.find(period => period.current);
        },
        probabilityRows() {
            if (!this.selectedPeriod) return [];
            if (!this.selectedPeriod.probability_rows?.length) return [];

            return this.selectedPeriod.probability_rows.map(row => {
                return [
                    row.label,
                    ...row.probability_cols.map(col => col.label)
                ]
            });
        },
        consequenceRows() {
            if (!this.selectedPeriod) return [];
            if (!this.selectedPeriod.consequence_rows?.length) return [];

            return this.selectedPeriod.consequence_rows.map(row => {
                return [
                    row.label,
                    ...row.consequence_cols.map(col => col.label)
                ]
            });
        },
    },
    mounted() {
        this.loading = true;

        this.getRiskPeriods()
            .then(() => {
                this.loading = false;
            });
    },
    methods: {
        getRiskPeriods() {
            return getRiskPeriods()
                .then(({ list }) => {
                    this.periods = list;
                    this.selectedPeriod = list.find(period => period.current);
                });
        },
        savePeriod() {
            if (!this.validate()) return;
            const data = {
                consequenceTable: this.consequenceTable,
                probabilityTable: this.probabilityTable,
                title: this.selectedPeriod.title,
                probabilityTitle: this.selectedPeriod.probability_title,
                consequenceTitle: this.selectedPeriod.consequence_title,
            };

            this.loading = true;
            return createRiskPeriod(data)
                .then(this.getRiskPeriods)
                .finally(() => {
                    this.creationMode = false;
                    this.loading = false;
                })
        },
        openNewPeriod() {
            this.selectedPeriod = JSON.parse(JSON.stringify(this.currentPeriod));
            this.selectedPeriod.id = null;

            this.$nextTick(() => {
                this.consequenceTable = JSON.parse(JSON.stringify(this.consequenceRows));
                this.probabilityTable = JSON.parse(JSON.stringify(this.probabilityRows));
                this.creationMode = true;
            });
        },
        onPeriodClick(period) {
            this.selectedPeriod = period;
            this.creationMode = false;
        },
        validate() {
          this.notificationMessages = [];

          if (!this.selectedPeriod.title) {
              this.notificationMessages.push('Period title is mandatory field');
          }
          if (!this.selectedPeriod.probability_title) {
              this.notificationMessages.push('Probability title is mandatory field');
          }
          if (!this.selectedPeriod.consequence_title) {
              this.notificationMessages.push('Consequence title is mandatory field');
          }
          const hasDuplication = this.periods.findIndex(period => period.title === this.selectedPeriod.title) !== -1;
          if (hasDuplication) {
              this.notificationMessages.push('Period title should have a unique value');
          }

          return !this.notificationMessages.length;
        },
    },
};
</script>