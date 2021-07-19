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
  <ChangePositionalSettings
    :active="changePositionalSettingsModal"
    :selected-setting="selectedSetting"
    @closeModal="changePositionalSettingsModalToggle"
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
        <div class="row">
          <div
            v-for="key in Object.keys(showSettings).filter(s => ['number','string'].includes(typeof showSettings[s]))"
            :key="'showSettings'+key"
            class="col"
          >
            <TextInput
              :input-name="key"
              :value="showSettings[key]"
              @changeValue="showSettings[key] = $event"
            />
          </div>
        </div>
        <div class="input-group mb-3">
          <select
            v-model="selectedSetting"
            name="showSettings"
            class="form-control"
          >
            <optgroup
              v-for="key in Object.keys(showSettings).filter(s => typeof showSettings[s] === 'object')"
              :key="'selectSettings'+key"
              :label="key"
            >
              <option
                v-for="subkey in Object.keys(showSettings[key])"
                :key="'selectSettings'+key+subkey"
                :value="key + '/' + subkey"
              >
                {{ subkey }}
              </option>
            </optgroup>
          </select>
          <button
            type="button"
            class="btn btn-primary mx-2"
            @click="changePositionalSettingsModalToggle"
          >
            Change Settings
          </button>
        </div>
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
import { Map, ShowSettings } from '../../shared/types';
import { UPDATE_API_KEY, UPDATE_POOL, UPDATE_SHOW_SETTINGS } from '../store/main_types';

import TextInput from '../components/TextInput.vue';
import AddMapModal from '../components/AddMapModal.vue';
import ImportMapsModal from '../components/ImportMapsModal.vue';
import ReplaySubmissionModal from '../components/ReplaySubmissionModal.vue';
import ChangePositionalSettings from '../components/ChangePositionalSettings.vue';

import axios from 'axios';

export default defineComponent({
  name: "Main",
  components: {
    TextInput,
    AddMapModal,
    ImportMapsModal,
    ReplaySubmissionModal,
    ChangePositionalSettings
  },
  data() {
    return {
      addMapModal: false,
      importMapsModal: false,

      replaySubmissionModal: false,
      replaySubmissionSelectedMap: {} as Map,

      changePositionalSettingsModal: false,
      selectedSetting: "",
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
    },
    showSettings: {
      get (): ShowSettings {
          return this.$store.state.showSettings;
      },
      set (value: ShowSettings) {
          this.$store.commit(UPDATE_SHOW_SETTINGS, value);
      },
    }
  },
  methods: {
    addMapModalToggle() {
      const body = document.querySelector("body")
      this.addMapModal = !this.addMapModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal || this.changePositionalSettingsModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    importMapsModalToggle() {
      const body = document.querySelector("body")
      this.importMapsModal = !this.importMapsModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal || this.changePositionalSettingsModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    replaySubmissionModalToggle(map: Map) {
      this.replaySubmissionSelectedMap = map;
      const body = document.querySelector("body")
      this.replaySubmissionModal = !this.replaySubmissionModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal || this.changePositionalSettingsModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
    },
    changePositionalSettingsModalToggle() {
      if (this.selectedSetting === "") return;
      const body = document.querySelector("body")
      this.changePositionalSettingsModal = !this.changePositionalSettingsModal
      this.addMapModal || this.importMapsModal || this.replaySubmissionModal || this.changePositionalSettingsModal ? body?.classList.add("modal-open") : body?.classList.remove("modal-open")
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