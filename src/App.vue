<template>
  <router-view v-slot="{ Component }">
    <transition
      name="main"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import MainApp from "./views/MainApp.vue";
</script>

<style>
/* Transition */
.main-enter-active,
.main-leave-active {
  transition: opacity 0.5s ease;
}
.main-enter-from,
.main-leave-to {
  opacity: 0;
}
</style>
