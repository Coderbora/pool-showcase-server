<template>
  <Modal
    :active="active"
    @closeModal="$emit('closeModal')"
  >
    <TextInput
      input-name="Beatmap URL"
      :value="beatmapUrl"
      @changeValue="beatmapUrl = $event"
    />
    <button
      type="button"
      class="btn btn-primary my-2"
      @click="getMapDetails"
    >
      Get Map Details
    </button>

    <template
      v-for="key in Object.keys(beatmap)"
      :key="'addMap_'+key"
    >
      <template v-if="['string', 'number'].includes(typeof beatmap[key])">
        <TextInput
          :input-name="key"
          :value="beatmap[key]"
          @changeValue="beatmap[key] = $event"
        />
      </template>
      <template v-else-if="typeof beatmap[key] === 'object'">
        <TextInput
          v-for="subkey in Object.keys(beatmap[key])"
          :key="'addMap_'+key+subkey"
          :input-name="subkey"
          :value="beatmap[key][subkey]"
          @changeValue="beatmap[key][subkey] = $event"
        />
      </template>
    </template>

    <button
      type="button"
      class="btn btn-primary mx-2"
      @click="addMap"
    >
      Add
    </button>
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
import { defineComponent } from 'vue';
import axios from 'axios';

import TextInput from './TextInput.vue';
import Modal from './Modal.vue';
import { mapState } from 'vuex';
import { Map } from '../../shared/types';
import { UPDATE_POOL } from '../store/main_types';

function initialState() {
  return {
    beatmapUrl: "",

    beatmap: {
      id: -1,

      title: "",
      artist: "",
      version: "",
      img_url: "",
      mapper: "",

      diff: {
          cs: 0,
          hp: 0,
          od: 0,
          ar: 0,
          sr: 0
      },

      length: 0,
      bpm: 0,

      modpool: "NM",
      modpool_id: 0,
    } as Map,
  }
}

export default defineComponent({
  name: "AddMapModal",
  components: {
    TextInput,
    Modal
  },
  props: {
    active: {
      type: Boolean,
      default: false
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
    parse_beatmap_url: function (beatmap_url: string) {
      let beatmap_id = -1;

      if (beatmap_url.includes("#osu/"))
        beatmap_id = parseInt(beatmap_url.split("#osu/").pop() || "-1");
      else if (beatmap_url.includes("/b/"))
        beatmap_id = parseInt(beatmap_url.split("/b/").pop() || "-1");
      else if (beatmap_url.includes("/osu/"))
        beatmap_id = parseInt(beatmap_url.split("/osu/").pop() || "-1");
      else if (beatmap_url.includes("/beatmaps/"))
        beatmap_id = parseInt(beatmap_url.split("/beatmaps/").pop() || "-1");

      return beatmap_id;
    },
    async getMapDetails() {
      const beatmap_id = this.parse_beatmap_url(this.beatmapUrl);
      const {data: mapDetails } = await axios.get("https://osu.ppy.sh/api/get_beatmaps", { params: {
        k: this.apiKey,
        b: beatmap_id
      }});

      Object.assign(this.beatmap, {
        id: beatmap_id,
        title: mapDetails[0].title,
        artist: mapDetails[0].artist,
        version: mapDetails[0].version,
        mapper: mapDetails[0].creator,
        img_url: `https://assets.ppy.sh/beatmaps/${mapDetails[0].beatmapset_id}/covers/list@2x.jpg`,
        diff: {
          cs: mapDetails[0].diff_size,
          ar: mapDetails[0].diff_approach,
          od: mapDetails[0].diff_overall,
          hp: mapDetails[0].diff_drain,
          sr: mapDetails[0].difficultyrating,
        },
        length: mapDetails[0].total_length,
        bpm: mapDetails[0].bpm,
      });
    },
    addMap() {
      this.showcasePool = [this.beatmap, ...this.showcasePool];
      this.$emit('closeModal');
    }
  }
})
</script>

<style>

</style>