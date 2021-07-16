<template>
  <AddMapModal
    :active="addMapModal"
    @closeModal="addMapModalToggle"
  />
  <ImportMapsModal
    :active="importMapsModal"
    @closeModal="importMapsModalToggle"
  />
  <div class="container">
    <div class="card my-3">
      <div class="card-header">
        Settings
      </div>
      <div class="card-body">
        <TextInput
          input-name="API Key"
          :value="apiKey"
          input-type="password"
          @changeValue="apiKey = $event"
        />
        <button
          type="button"
          class="btn btn-primary mx-2"
          @click="addMapModalToggle"
        >
          Add Map
        </button><button
          type="button"
          class="btn btn-primary mx-2"
          @click="importMapsModalToggle"
        >
          Import Maps
        </button>
      </div>
    </div>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Map Name
          </th>
          <th scope="col">
            Replay Submitter
          </th>
          <th scope="col">
            Actions
          </th>
        </tr>
      </thead>
      <tr
        v-for="(map, index) in showcasePool"
        :key="'map'+index"
      >
        <td>{{ map['modpool'] }}{{ map['modpool_id'] }}</td>
        <td>{{ map['artist'] }} - {{ map['title'] }} [{{ map['version'] }}]</td>
        <td>{{ map['playedBy'] ? map['playedBy']['username'] : "-" }}</td>
        <td>Selam</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Map } from '../store/main';
import { UPDATE_API_KEY } from '../store/main_types';
import { mapState } from 'vuex';

import TextInput from '../components/TextInput.vue';
import AddMapModal from '../components/AddMapModal.vue';
import ImportMapsModal from '../components/ImportMapsModal.vue';

export default defineComponent({
  name: "Main",
  components: {
    TextInput,
    AddMapModal,
    ImportMapsModal
  },
  data() {
    return {
      addMapModal: false,
      importMapsModal: false,
    }
  },
  computed: {
    ...mapState({
      showcasePool: (state: any) => state.showcasePool as Map[],
    }),
    apiKey: {
        get (): string {
            return this.$store.state.apiKey;
        },
        set (value) {
            this.$store.commit(UPDATE_API_KEY, value);
        },
    }
  },
  methods: {
    addMapModalToggle() {
      const body = document.querySelector("body")
      this.addMapModal = !this.addMapModal
      this.addMapModal || this.importMapsModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    importMapsModalToggle() {
      const body = document.querySelector("body")
      this.importMapsModal = !this.importMapsModal
      this.addMapModal || this.importMapsModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
  }
})
</script>

<style scoped>

</style>