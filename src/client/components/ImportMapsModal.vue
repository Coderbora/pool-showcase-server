<template>
  <Modal
    :active="active"
    @closeModal="$emit('closeModal')"
  >
    <template v-if="parsedData.length === 0 || !isParsed">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Sheet</span>
        </div>
        <textarea
          v-model="sheetData"
          class="form-control"
        />
      </div>
      <button
        type="button"
        class="btn btn-primary m-2"
        @click="parseSheet"
      >
        Continue
      </button>
      <button
        type="button"
        class="btn btn-secondary m-2"
        @click="$emit('closeModal')"
      >
        Close
      </button>
    </template>
    <template v-else>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th
              v-for="(i, index) in parsedData[0]"
              :key="'col'+index"
            >
              <select
                v-model="columns[index]"
                class="form-control"
              >
                <option
                  v-for="type in columnTypes"
                  :key="'col'+index+type"
                >
                  {{ type }}
                </option>
              </select>
            </th>
          </tr>
        </thead>
        <tr
          v-for="(row, rowIndex) in parsedData"
          :key="'line'+rowIndex"
        >
          <td
            v-for="(cell, colIndex) in row"
            :key="'cell'+rowIndex+colIndex"
          >
            {{ cell }}
          </td>
        </tr>
      </table>
      <button
        type="button"
        class="btn btn-primary m-2"
        @click="importMaps"
      >
        Continue
      </button>
      <button
        type="button"
        class="btn btn-secondary m-2"
        @click="$emit('closeModal')"
      >
        Close
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Modal from './Modal.vue';
import { mapState } from 'vuex';
import { Map } from '../../shared/types';
import { UPDATE_POOL } from '../store/main_types';
import axios from 'axios';

function defaultBeatmapScheme() {
  return Object.assign({
      id: -1,

      title: "",
      artist: "",
      version: "",
      img_url: "",

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
    } as Map, {});
}

export default defineComponent({
  name: "AddMapModal",
  components: {
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
    return {
      sheetData: "",
      isParsed: false,
      parsedData: [] as string[][],

      columnTypes: ["", ...Object.keys(defaultBeatmapScheme()), "Full Song Name", "SR", "CS|AR|OD|HP", "Length (m:s)"],
      columns: [] as string[],
    }
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
  methods: {
    async getMapDetails(beatmap_id: number) {
      const {data: mapDetails } = await axios.get("https://osu.ppy.sh/api/get_beatmaps", { params: {
        k: this.apiKey,
        b: beatmap_id
      }});

      return Object.assign(defaultBeatmapScheme(), {
        id: beatmap_id,
        title: mapDetails[0].title,
        artist: mapDetails[0].artist,
        version: mapDetails[0].version,
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
    parseSheet() {
      const lines = this.sheetData.split('\n');
      for (const line of lines) {
        const lineParts = line.split("	");
        this.parsedData.push(lineParts);
      }
      this.parsedData = this.parsedData.filter(i => i !== null);
      this.isParsed = true;
    },
    async importMaps() {
      console.log(this.columns);

      const idIndex = this.columns.indexOf('id');

      for(const map of this.parsedData) {
        const mapScheme = defaultBeatmapScheme();

        if(this.columns.includes('id') && map[idIndex] !== "") {
          Object.assign(mapScheme, await this.getMapDetails(Number(map[idIndex])));
        }

        const existingDetails = this.columns.filter(c => c !== "");
        for (const detail of existingDetails) {
          const detailIndex = this.columns.indexOf(detail);
          if(Object.prototype.hasOwnProperty.call(mapScheme, detail)) { 
            mapScheme[detail as keyof typeof mapScheme] = map[detailIndex];
          } else {
            switch (detail) {
              case "Full Song Name": {
                const fullName = map[detailIndex];
                const parts = fullName.match(/(.+) - (.+)\[(.+)\]/);

                if(parts) {
                  mapScheme.artist = parts[1].trim();
                  mapScheme.title = parts[2].trim();
                  mapScheme.version = parts[3].trim();
                }
                break;
              }
              case "SR": {
                mapScheme.diff.sr = Number(map[detailIndex].replace(/[^\d.-]/g, ''));
                break;
              }
              case "CS|AR|OD|HP": {
                const allDiff = map[detailIndex];
                const diffParts = allDiff.split("|");

                Object.assign(mapScheme.diff, {
                  cs: Number(diffParts[0].trim()),
                  ar: Number(diffParts[1].trim()),
                  od: Number(diffParts[2].trim()),
                  hp: Number(diffParts[3].trim()),
                })
                break;
              }
              case "Length (m:s)": {
                const splittedLength = map[detailIndex].split(":");
                mapScheme.length = Number(splittedLength[0])*60 + Number(splittedLength[1]);
                break;
              }
            }
          }
        }
        this.showcasePool = [mapScheme, ...this.showcasePool];
      }
      this.$emit("closeModal");
    }
  }
})
</script>