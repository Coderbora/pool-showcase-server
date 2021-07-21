<template>
  <Modal
    :active="active"
    @closeModal="$emit('closeModal')"
  >
    <template v-if="map && map.playedBy">
      Existing Replay: {{ map.playedBy.username }}<br>
      Grade: {{ map.playedBy.rank }}<br>
      Score: {{ map.playedBy.score }}<br>
      Accuracy: {{ (map.playedBy.accuracy*100).toFixed(2) }}<br>
      Miss: {{ map.playedBy.count["0"] }}<br>
      <div class="row justify-content-center my-2">
        <div class="col-6 form-group">
          <TextInput
            input-name="Profile Image URL"
            :value="map.playedBy.playerAvatar"
            @changeValue="changeAvatar($event)"
          />
        </div>
      </div>
      <hr>
    </template>
    <div class="row justify-content-center my-2">
      <div class="col-6 form-group">
        <span>Select the replay file</span>
        <input
          type="file"
          accept=".osr"
          class="form-control-file"
          @change="filesSelected"
        >
        <button
          type="button"
          class="btn btn-primary mx-2"
          @click="readReplayData"
        >
          Set
        </button>
      </div>
    </div>
    <hr>
    <div class="row justify-content-center">
      <div class="col-6 form-group">
        <TextInput
          input-name="Beatmap Image URL"
          :value="map.img_url"
          @changeValue="changeBeatmapImage($event)"
        />
      </div>
    </div>
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
import { defineComponent, PropType } from 'vue';
import axios from 'axios';

import Modal from './Modal.vue';
import TextInput from './TextInput.vue';
import { mapState } from 'vuex';
import { Grade, Map } from '../../shared/types';
import { UPDATE_POOL } from '../store/main_types';
import { OsuReplay } from '@brunohpaiva/osu-parser';

function initialState() {
  return {
    files: null as (FileList | null)
  }
}

export default defineComponent({
  name: "ReplaySubmissionModal",
  components: {
    Modal,
    TextInput
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    map: {
      type: Object as PropType<Map>,
      required: true
    }
  },
  emits: ['closeModal'],
  data() {
    return initialState();
  },
  computed: {
    ...mapState({
      apiKey: (state: any) => state.apiKey as string,
    }),
    showcasePool: {
      get (): Map[] {
          return this.$store.state.showcasePool;
      },
      set (value: Map[]) {
          this.$store.commit(UPDATE_POOL, value);
      },
    }
  },
  watch: {
    active(value) {
      if(value === true) Object.assign(this.$data, initialState());
    }
  },
  methods: {
    filesSelected(e: Event) {
      this.files = (e.target as HTMLInputElement).files;
    },
    async readReplayData() {
      if (this.files && this.files.length > 0) {
        const formData = new FormData();
        formData.append("replay", this.files[0]);
        const replayData = (await axios.post('/readReplay', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })).data as OsuReplay;

        // rank and accuracy calculation
        // https://osu.ppy.sh/wiki/en/Game_mode/osu!
        const allObjects = replayData.count300s + replayData.count100s + replayData.count50s + replayData.countMisses;
        const hitPoints = (300*replayData.count300s) + (100*replayData.count100s) + (50*replayData.count50s);

        const accuracy = (hitPoints / (allObjects * 300));

        const ratio300 = replayData.count300s / allObjects;
        const ratio50 = replayData.count50s / allObjects;

        let grade: Grade = "D";
        if(accuracy === 1) grade = "X";
        else {
          if(ratio300 > 0.9 && ratio50 < 0.01 && replayData.countMisses === 0) grade = "S";
          else if ((ratio300 > 0.8 && replayData.countMisses === 0) || ratio300 > 0.9) grade = "A";
          else if ((ratio300 > 0.7 && replayData.countMisses === 0) || ratio300 > 0.8) grade = "B";
          else if (ratio300 > 0.6) grade = "C";
        }

        if((replayData.modsUsed.includes("Hidden") || replayData.modsUsed.includes("Flashlight")) && ["X", "S"].includes(grade)) grade = (grade + "H") as Grade;
        //

        const {data: userProfile } = await axios.get("https://osu.ppy.sh/api/get_user", { params: {
          k: this.apiKey,
          u: replayData.playerName
        }});

        const copyPool = [...this.showcasePool];

        copyPool[copyPool.indexOf(this.map)].playedBy = {
          playerAvatar: userProfile.length > 0 ? `https://a.ppy.sh/${userProfile[0]["user_id"]}?123` : "",

          username: replayData.playerName,
          rank: grade,

          count: {
              "300": replayData.count300s,
              "100": replayData.count100s,
              "50": replayData.count50s,
              "0": replayData.countMisses,
          },

          maxcombo: replayData.greatestCombo,
          accuracy,
          score: replayData.totalScore,
          modsUsed: replayData.modsUsed
        };

        this.showcasePool = copyPool;
      }
    },
    changeAvatar(avatar: string) {
      const copyPool = [...this.showcasePool];
      const player = copyPool[copyPool.indexOf(this.map)].playedBy;
      if(player) player.playerAvatar = avatar;
      this.showcasePool = copyPool;
    },
    changeBeatmapImage(image: string) {
      const copyPool = [...this.showcasePool];
      copyPool[copyPool.indexOf(this.map)].img_url = image;
      this.showcasePool = copyPool;
    }
  }
})
</script>

<style>

</style>