<template>
  <router-view />
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
