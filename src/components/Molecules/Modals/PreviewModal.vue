<template>
  <div>
    <div
      class="underline"
      @click="display = true">
      <slot>
        {{ dataObj.title }}
      </slot>
    </div>

    <Teleport to=".main">
      <Transition name="slide">
        <div
          v-if="display"
          class="fixed inset-0 z-20">
          <div class="preview-container absolute bg-white rounded-md">
            <component
              v-if="dataInstance.component"
              :is="dataInstance.component"
              v-bind="dataInstance.props"
              @updated="$emit('updated', $event)">
            </component>
            
            <div
              v-if="dataInstance.props.fullViewUrl"
              class="cursor-pointer absolute top-3 right-16"
              @click="display = false">
              <div class="border rounded-md">
                <router-link
                  class="flex px-4 py-2"
                  :to="dataInstance.props.fullViewUrl">
                  <FeatherIcon
                    icon="arrow-down-left" />
                  <FeatherIcon
                    icon="arrow-up-right" />
                </router-link>
              </div>
            </div>

            <div
              class="cursor-pointer absolute top-5 right-6"
              @click="display = false">
              <FeatherIcon icon="x" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { getItemComponentByObj } from '../../../utils';
import { ref, shallowRef } from 'vue';
import FeatherIcon from '../../Atoms/FeatherIcon.vue';

export default {
    components: {
        FeatherIcon
    },
    props: {
        dataObj: {
            type: Object,
            required: true,
            default: () => ({}),
            validator: item => item.objType
        },
    },
    setup(props) {
        let display = ref(false);
        let dataInstance = shallowRef(getItemComponentByObj(props.dataObj));

        return {
            display,
            dataInstance
        };
    },
};
</script>

<style scoped>
.preview-container {
    top: 5%;
    left: 15%;
    bottom: 5%;
    right: 0;
}
.slide-enter-active {
    transition: all 0.4s ease-out;
}

.slide-leave-active {
    transition: all 0.4s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>