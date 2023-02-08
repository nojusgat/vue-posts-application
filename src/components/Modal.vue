<template>
  <transition name="fade">
    <div v-if="isActive" class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="closeModal"></div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Model",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    closeModal: {
      type: Function
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
