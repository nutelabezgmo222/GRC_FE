<template>
  <Teleport to=".app">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed z-20 bg-black/[.50] inset-0 flex modal-mask">
        <div class="modal-container m-auto relative w-1/2 p-5 pr-10 bg-white rounded-md">
          <div class="mb-4">
            <slot name="header">
              <Title
                type="big"
                :title="title" />
            </slot>
          </div>

          <div class="p-3 mb-4 flex-grow">
            <slot name="body">
            </slot>
          </div>

          <div>
            <slot name="buttons">
              <div class="flex justify-end">
                <Button
                  class="mr-4"
                  type="save"
                  @click="$emit('submit')">
                  {{ okButtonText }}
                </Button>

                <Button
                  type="remove"
                  @click="$emit('cancel')">
                  {{ cancelButtonText }}
                </Button>
              </div>
            </slot>
          </div>

          <div
            class="cursor-pointer absolute top-5 right-6"
            @click="$emit('cancel')">
            <FeatherIcon icon="x" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import FeatherIcon from '../../Atoms/FeatherIcon.vue';
import Title from '../../Atoms/Title.vue';
import Button from '../../Atoms/Button.vue';

export default {
    components: {
        FeatherIcon,
        Title,
        Button
    },
    props: {
        title: {
            type: String,
            required: false,
            default: ''
        },
        show: {
            type: Boolean,
            required: false,
            default: false,
        },
        okButtonText: {
            type: String,
            required: false,
            default: 'Save'
        },
        cancelButtonText: {
            type: String,
            required: false,
            default: 'Cancel'
        },
    },
    emits: ['cancel', 'submit']
};
</script>

<style scoped>
.preview-container {
    top: 5%;
    left: 5%;
    bottom: 5%;
    right: 0;
}
.modal-container, .modal-mask {
    transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container{
    transform: scale(1.2);
}
</style>