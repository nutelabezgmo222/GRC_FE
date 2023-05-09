<template>
  <Teleport to=".app">
    <Transition name="fade">
      <div
        v-if="notificationMessage?.length"
        class="p-5 fixed bottom-0 inset-x-0 z-30"
        :class="[{'bg-red-300': type === 'error'}]">
        <div v-if="typeof notificationMessage === 'string'">
          {{ notificationMessage }}
        </div>
        <div v-if="Array.isArray(notificationMessage)">
          <ul>
            <li 
              v-for="(item, idx) in notificationMessage"
              :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>

        <div
          class="cursor-pointer absolute top-5 right-6"
          @click="notificationMessage = ''">
          <FeatherIcon icon="x" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import FeatherIcon from './FeatherIcon.vue';
const Types = ['error', 'success'];

export default {
    components: {
        FeatherIcon
    },
    props: {
        type: {
            type: String,
            required: false,
            default: 'error',
            validator: (newType) => Types.includes(newType)
        },
        message: {
            type: [String, Array],
            required: false,
            default: '',
        },
        hideAfter: {
            type: [String, Number],
            required: false,
            default: 0,
            note: 'miliseconds'
        },
    },
    data() {
        return {
            notificationMessage: '',
            timer: null
        };
    },
    watch: {
        message(newMessage) {
            this.initMessage(newMessage);
        },
    },
    mounted() {
        this.initMessage(this.message);
    },
    methods: {
        initMessage(message) {
            this.notificationMessage = message;
            clearTimeout(this.timer);

            if(this.hideAfter) {
                this.timer = setTimeout(() => {
                    this.notificationMessage = '';
                }, this.hideAfter);
            }
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>