<template>
  <AddMapModal
    :active="addMapModal"
    @closeModal="addMapModalToggle"
  />
  <ImportMapsModal
    :active="importMapsModal"
    @closeModal="importMapsModalToggle"
  />
  <ReplaySubmissionModal
    :active="replaySubmissionModal"
    :map="replaySubmissionSelectedMap"
    @closeModal="replaySubmissionModalToggle"
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
        <button
          type="button"
          class="btn btn-primary mx-2"
          @click="syncMaps"
        >
          Sync
        </button>
        <button
          type="button"
          class="btn btn-danger mx-2"
          @click="showcasePool = []"
        >
          Clear Pool
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
        <td>
          <img
            class="action"
            src="../assets/edit.svg"
            alt="Edit"
            @click="replaySubmissionModalToggle(map)"
          >
          <img
            class="action"
            src="../assets/times.svg"
            alt="Delete"
            @click="removeMap(map)"
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Map } from '../../shared/types';
import { UPDATE_API_KEY, UPDATE_POOL } from '../store/main_types';

import TextInput from '../components/TextInput.vue';
import AddMapModal from '../components/AddMapModal.vue';
import ImportMapsModal from '../components/ImportMapsModal.vue';
import ReplaySubmissionModal from '../components/ReplaySubmissionModal.vue';

import axios from 'axios';

export default defineComponent({
  name: "Main",
  components: {
    TextInput,
    AddMapModal,
    ImportMapsModal,
    ReplaySubmissionModal
  },
  data() {
    return {
      addMapModal: false,
      importMapsModal: false,

      replaySubmissionModal: false,
      replaySubmissionSelectedMap: {} as Map,
    }
  },
  computed: {
    apiKey: {
        get (): string {
            return this.$store.state.apiKey;
        },
        set (value) {
            this.$store.commit(UPDATE_API_KEY, value);
        },
    },
    showcasePool: {
      get (): Map[] {
          return this.$store.state.showcasePool;
      },
      set (value: Map[]) {
          this.$store.commit(UPDATE_POOL, value);
      },
    }
  },
  methods: {
    addMapModalToggle() {
      const body = document.querySelector("body")
      this.addMapModal = !this.addMapModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    importMapsModalToggle() {
      const body = document.querySelector("body")
      this.importMapsModal = !this.importMapsModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    replaySubmissionModalToggle(map: Map) {
      this.replaySubmissionSelectedMap = map;
      const body = document.querySelector("body")
      this.replaySubmissionModal = !this.replaySubmissionModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    async syncMaps() {
      await axios.post("/showcasePool", this.showcasePool, { headers: {
        'Content-Type': 'application/json'
      }});
    },
    removeMap(map: Map) {
      this.showcasePool.splice(this.showcasePool.indexOf(map), 1);
    },
  }
})
</script>

<style>
.action {
  cursor: pointer;
  width: 24px;
}
</style>