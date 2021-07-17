<template>
  <div class="main">
    {{ $route.params.modpool }}{{ $route.params.modpoolid }}

    {{ map }}
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import { Map } from '../../shared/types';

export default defineComponent({
    name: "Show",
    data() {
      return {
        map: {} as Map | undefined,
        pool: [] as Map[]
      }
    },
    async created() {
      this.pool = (await axios.get("/showcasePool")).data;
      document.body.className = 'transparent';

      const modpool = this.$route.params.modpool.toString();
      const modpool_id = Number(this.$route.params.modpoolid.toString());

      this.map = this.pool.find(m => m.modpool.toLowerCase() === modpool.toLowerCase() && m.modpool_id == modpool_id )
    },
})
</script>

<style>
body.transparent {
  background: rgba(0,0,0,0) !important;
}
</style>

<style scoped>
.main {
    width: 1920px;
    height: 1080px;

}
</style>