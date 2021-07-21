<template>
  <Modal
    :active="active"
    @closeModal="$emit('closeModal')"
  >
    <h6>{{ selectedSetting }}</h6>
    <hr>
    <template
      v-for="key in Object.keys(setting)"
      :key="key"
    >
      <TextInput
        v-if="['string', 'number'].includes(typeof setting[key]) && key !== 'type'"
        :input-name="key"
        :value="setting[key]"
        @changeValue="setting[key] = typeof setting[key] == 'number' ? Number($event) : $event"
      />
      <div
        v-else-if="typeof setting[key] === 'boolean'"
        class="form-check form-check-inline mb-3"
      >
        <input
          v-model="setting[key]"
          class="form-check-input"
          type="checkbox"
        >
        <label class="form-check-label">{{ key }}</label>
      </div>
    </template>
    <button
      type="button"
      class="btn btn-secondary mx-2"
      @click="$emit('closeModal')"
    >
      Close
    </button>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ShowSettings, ComponentDetails } from '../../shared/types'
import { UPDATE_SHOW_SETTINGS } from '../store/main_types';

import Modal from './Modal.vue';
import TextInput from './TextInput.vue';

function initialState() {
  return {
    setting: {} as ComponentDetails
  }
}

export default defineComponent({
    name: "ChangePositionalSettings",
    components: {
      Modal,
      TextInput
    },
    props: {
      active: {
        type: Boolean,
        default: false
      },
      selectedSetting: {
        type: String,
        required: true
      },
    },
    emits: ['closeModal'],
    data() {
      return initialState();
    },
    computed: {
      showSettings: {
        get (): ShowSettings {
            return this.$store.state.showSettings;
        },
        set (value: ShowSettings) {
            this.$store.commit(UPDATE_SHOW_SETTINGS, value);
        },
      }
    },
    watch: {
      active(value) {
        if(value === true) {
          Object.assign(this.$data, initialState());
          const settingParts = this.selectedSetting.split("/");
          if(settingParts.length == 2) { 
            const mainSetting = this.showSettings[settingParts[0] as keyof ShowSettings];
            this.setting = mainSetting[settingParts[1] as keyof typeof mainSetting];
          }
        } else {
          this.changeSetting();
        }
      }
    },
    methods: {
      changeSetting() {
        const copySettings = {...this.showSettings};

        this.showSettings = copySettings;
      }
    }
})
</script>
