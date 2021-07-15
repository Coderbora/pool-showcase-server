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
        <a 
          class="btn btn-primary"
          @click.prevent="init"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex';
import { SET_INITIALIZED } from '../store/main_types'

export default defineComponent({
  name: "Home",
  computed: {
    ...mapState({
        initialized: (state: any) => state.initialized as boolean,
    }),
  },
  created() {
    if(this.initialized) this.$router.push("/main");
  },
  methods: {
    init() {
      this.$store.commit(SET_INITIALIZED);
      this.$router.push("/main");
    }
  }
})
</script>

<style scoped>
.branding {
    margin: 2rem;
}
</style>