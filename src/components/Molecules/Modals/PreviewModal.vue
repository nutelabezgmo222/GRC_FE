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
          class="absolute inset-0">
          <div class="preview-container absolute bg-white">
            <component
              v-if="dataInstance.component"
              :is="dataInstance.component"
              v-bind="dataInstance.props">
            </component>

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

// export default {
//     components: {
//         FeatherIcon,
//     },
//     props: {
//         dataObj: {
//             type: Object,
//             required: true,
//             default: () => ({}),
//             validator: item => item.objType
//         },
//     },
//     data() {
//         return {
//             display: false,
//             dataInstance: null
//         };
//     },
//     mounted() {
//         this.dataInstance = getItemComponentByObj(this.dataObj);
//     },
// };
</script>

<style scoped>
.preview-container {
    top: 5%;
    left: 5%;
    bottom: 5%;
    right: 0;
}
.slide-enter-active {
    transition: all 0.8s ease-out;
}

.slide-leave-active {
    transition: all 0.8s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>