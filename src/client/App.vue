<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="route.meta.transition || 'fade'"
      mode="out-in"
    >
      <component
        :is="Component"
        :is-logged="isLogged"
        :user="user"
      />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  created() {
    this.$router.push('/');
  }
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
