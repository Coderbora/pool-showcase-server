<template>
  <div class="branding">
    <h1>Mappool Showcase Server</h1>
  </div>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Welcome
      </div>
      <div class="card-body">
        <p class="card-text">
          Welcome to the Mappool Showcase Server! This project's aim is to create an overlay for OBS, which will help streaming mappool showcase with mappool details and replay data.
        </p>
        <router-link 
          to="/main"
          class="btn btn-primary"
        >
          Get Started
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Home",
})
</script>

<style scoped>
.branding {
    margin: 2rem;
}
</style>