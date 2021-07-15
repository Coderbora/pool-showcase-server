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
@import url('./assets/css/font/OpenSans.css');

body {
    background: #333;
    color: white;
    text-align: center;
}

:root {
    --bs-font-sans-serif: "Open Sans";
}

.card {
    background: #444;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .15s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
