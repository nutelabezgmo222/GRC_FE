<template>
  <div>
    <LoadingIndicator
      v-if="loading"
      class="h-full" />

    <div
      v-else
      class="flex">
      <div class="w-1/2 mr-12">
        <Title
          title="Linked risks"
          class="mb-3"
          type="medium" />

        <div class="flex">
          <SingleSelect
            :value="selectedValues.risk"
            :options="risksOptions"
            @input="selectedValues.risk = $event" />
          
          <Button
            class="ml-4"
            type="save"
            @click="linkItem(ObjectTypes.RISK, selectedValues.risk)">
            Link
          </Button>
        </div>

        <div class="p-5 bg-main-gray mt-12 rounded-md">
          <div v-if="linkedRisks.length">
            <div
              v-for="linkedRisk in linkedRisks"
              :key="linkedRisk.id"
              class="text-lg p-3 bg-white rounded-md flex items-center justify-between mb-3">
              <div
                class="cursor-pointer"
                @click="onLinkClick(linkedRisk.baseUrl)">
                {{ linkedRisk.title }}
              </div>

              <FeatherIcon
                class="font-bold text-main-orange cursor-pointer"
                stroke-width="2"
                icon="x"
                @click="deleteLink(ObjectTypes.RISK, linkedRisk.id)" />
            </div>
          </div>

          <div v-else>
            List is empty
          </div>
        </div>
      </div>

      <div class="w-1/2">
        <Title
          title="Linked controls"
          class="mb-3"
          type="medium" />
        
        <div class="flex">
          <SingleSelect
            :value="selectedValues.control"
            :options="controlsOptions"
            @input="selectedValues.control = $event" />
          
          <Button
            class="ml-4"
            type="save"
            @click="linkItem(ObjectTypes.CONTROL, selectedValues.control)">
            Link
          </Button>
        </div>

        <div class="p-5 bg-main-gray mt-12 rounded-md">
          <div v-if="linkedControls.length">
            <div
              v-for="linkedControl in linkedControls"
              :key="linkedControl.id"
              class="text-lg p-3 bg-white rounded-md flex items-center justify-between mb-3">
              <div
                class="cursor-pointer"
                @click="onLinkClick(linkedControl.baseUrl)">
                {{ linkedControl.title }}
              </div>

              <FeatherIcon
                class="font-bold text-main-orange cursor-pointer"
                stroke-width="2"
                icon="x"
                @click="deleteLink(ObjectTypes.CONTROL, linkedControl.id)" />
            </div>
          </div>

          <div v-else>
            List is empty
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRisks } from '../../../api/risks';
import { getControls } from '../../../api/controls';

import LoadingIndicator from '../../Atoms/LoadingIndicator.vue';
import Title from '../../Atoms/Title.vue';
import SingleSelect from '../../Atoms/Fields/SingleSelect.vue';
import Button from '../../Atoms/Button.vue';
import FeatherIcon from '../../Atoms/FeatherIcon.vue';

import { ObjectTypes } from '../../../constants/ObjectTypes';

export default {
    name: 'LinksPage',
    components: {
        LoadingIndicator,
        Title,
        SingleSelect,
        Button,
        FeatherIcon,
    },
    props: {
        data: {
            type: Object,
            required: true,
            default: () => ({})
        },
    },
    data() {
        return {
            risks: [],
            controls: [],
            selectedValues: {
                risk: null,
                control: null
            },
            loading: false,
            ObjectTypes
        };
    },
    computed: {
        linkedRisks() {
            return this.risks.filter(risk => this.data.linked.risk?.includes(risk.id));
        },
        linkedControls() {
            return this.controls.filter(control => this.data.linked.control?.includes(control.id));
        },
        risksOptions() {
            let result = this.risks.map(risk => ({
                label: risk.title,
                value: risk.id
            })).filter(risk => !this.data.linked.risk?.includes(risk.value));

            if (this.data.objType === ObjectTypes.RISK) {
                result = result.filter(risk => risk.value !== this.data.id);
            }

            return result;
        },
        controlsOptions() {
            let result = this.controls.map(control => ({
                label: control.title,
                value: control.id
            })).filter(control => !this.data.linked.control?.includes(control.value));

            if (this.data.objType === ObjectTypes.CONTROL) {
                result = result.filter(control => control.value !== this.data.id);
            }

            return result;
        },
    },
    beforeMount() {
        this.loading = true;
        const promises = [
            this.getRisks(),
            this.getControls()
        ];

        return Promise.all(promises)
            .then(() => this.loading = false);
    },
    methods: {
        getRisks() {
            return getRisks()
                .then(({list}) => {
                    this.risks = list;
                });
        },
        getControls() {
            return getControls()
                .then(({list}) => {
                    this.controls = list;
                });
        },
        onLinkClick(path) {
            console.log(path);
            this.$router.push(path);
        },
        linkItem(type, id) {
            let ids = this.data.linked?.[type].slice(0) || [];
            ids.push(id);

            this.$emit('propertyChanged', {linked: {
                ...this.data.linked,
                [type]: ids
            }});

            this.selectedValues[type] = null;
        },
        deleteLink(type, id) {
            let ids = this.data.linked?.[type].slice(0) || [];
            ids = ids.filter(selectedId => selectedId !== id);

            this.$emit('propertyChanged', {linked: {
                ...this.data.linked,
                [type]: ids
            }});
        }
    }
};
</script>