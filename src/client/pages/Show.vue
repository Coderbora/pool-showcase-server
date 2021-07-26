<template>
  <div
    class="main"
    :style="{ fontFamily: fontName }"
  >
    <template
      v-for="key in Object.keys(showSettings).filter(s => typeof showSettings[s] === 'object')"
      :key="'template_'+key"
    >
      <div
        v-for="component in Object.keys(showSettings[key]).filter(s => showSettings[key][s]['enabled'] === true)"
        :key="'component' + key + component"
        class="anchor"
        :style="{
          top: showSettings[key][component]['top']+'px',
          left: showSettings[key][component]['left']+'px'
        }"
        :name="[key, component].join('/')"
      >
        <div
          v-if="showSettings[key][component]['type'] === 'text'"
          :id="'component_' + [key, component].join('/')"
          class="component"
          :style="{ 
            fontSize: showSettings[key][component]['size']+'pt',
            width: showSettings[key][component]['maxWidth']+'px',
            color: showSettings[key][component]['mode'] == 'accent' ? showSettings['accentColor'] : showSettings['normalColor']
          }"
        >
          <marquee v-if="isOverflow(key, component)">
            {{ getComponentValue(key, component) }}
          </marquee>
          <span v-else>{{ getComponentValue(key, component) }}</span>
        </div>
        <div
          v-else-if="showSettings[key][component]['type'] === 'image'"
          class="image"
          :style="{
            width: showSettings[key][component]['width']+'px',
            height: showSettings[key][component]['height']+'px',
            background: 'url('+ getComponentValue(key, component) + ')'
          }"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import { Map, Player, ShowMapDetails, ShowPlayerDetails, ShowSettings } from '../../shared/types';

export default defineComponent({
    name: "Show",
    data() {
      return {
        map: {} as Map | undefined,
        pool: [] as Map[],
        showSettings: {} as ShowSettings,
        fontName: "",

        canvas: document.createElement("canvas")
      }
    },
    async created() {
      this.showSettings = (await axios.get("/showSettings")).data;
      if (this.showSettings.textFont != "") {
        let style = document.createElement('link');
        style.type = "text/css";
        style.rel = "stylesheet";
        style.href = this.showSettings.textFont;
        document.head.appendChild(style);

        const font = this.showSettings.textFont.match(/=(.*):/);

        this.fontName = font ? font[1] : "";
      }

      this.pool = (await axios.get("/showcasePool")).data;
      document.body.className = 'transparent';

      const modpool = this.$route.params.modpool.toString();
      const modpool_id = Number(this.$route.params.modpoolid.toString());

      this.map = this.pool.find(m => m.modpool.toLowerCase() === modpool.toLowerCase() && m.modpool_id == modpool_id )
    },
    methods: {
      isOverflow(mainKey: string, subKey: string) {
        let componentText = this.getComponentValue(mainKey, subKey);

        let context = this.canvas.getContext("2d");
        if(!context) return false;

        let mainSetting = this.showSettings[mainKey as keyof ShowSettings];
        context.font = `${ mainSetting[subKey as keyof typeof mainSetting]['size'] }pt ${this.fontName}`

        const { width } = context.measureText(componentText);

        return width >= mainSetting[subKey as keyof typeof mainSetting]['maxWidth'];
      },
      getComponentValue(mainKey: string, subKey: string): string {
        if(this.map && this.map.diff) {
          if (mainKey == "player" && this.map.playedBy) {
            if(this.map.playedBy[subKey as keyof Player] == "" && this.showSettings[mainKey][subKey as keyof ShowPlayerDetails].type == 'image') return this.showSettings.defaultImage;
            if(this.map.playedBy[subKey as keyof Player]) return this.map.playedBy[subKey as keyof Player].toString();
            else {
              switch (subKey) {
                case "maxCombo":
                  return `${this.map.playedBy.maxcombo}x`;
                case "displayAcc":
                  return `${(this.map.playedBy.accuracy*100).toFixed(2)}%`;
                case "displayScore":
                  return this.map.playedBy.score.toLocaleString();
                case "count300":
                  return this.map.playedBy.count["300"].toString();
                case "count100":
                  return this.map.playedBy.count["100"].toString();
                case "count50":
                  return this.map.playedBy.count["50"].toString();
                case "countMiss":
                  return this.map.playedBy.count["0"].toString();
              }
            }
          } else if (mainKey == "map") {
            if(this.map[subKey as keyof Map] == "" && this.showSettings[mainKey][subKey as keyof ShowMapDetails].type == 'image') return this.showSettings.defaultImage;
            if(this.map[subKey as keyof Map]) return this.map[subKey as keyof Map] as string;
            else {
              switch (subKey) {
                case "mapLength": {
                  let minutes = Math.floor(this.map.length / 60);
                  let seconds = this.map.length - (minutes * 60);
                  return `${minutes}:${seconds}`;
                }
                case "songName":
                  return `${this.map.title}`;
                case "cs":
                  return this.map.diff.cs.toString();
                case "ar":
                  return this.map.diff.ar.toString();
                case "od":
                  return this.map.diff.od.toString();
                case "hp":
                  return this.map.diff.hp.toString();
                case "sr":
                  return this.map.diff.sr.toString();
                case "mapID":
                  return `${this.map.modpool}${this.map.modpool_id}`;
              }
            }
          }
        }


        return "";
      }
    }
})
</script>

<style>
body.transparent {
  background: rgba(0,0,0,0) !important;
  width: 1920px !important;
  height: 1080px !important;
  overflow: hidden; 
}
</style>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;

  font-size: 18pt;
  font-weight: bold;
}

.component {
  margin-left: -50%;
  float: left;
  overflow: hidden;
  white-space: nowrap;
}

.image {
  background-size: cover !important;
}

.overflow {
  animation-name: bounce;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}

@keyframes bounce {
    0% {  transform: translateX(10%)    }
    50%   {  transform: translateX(-100%) }
    100% {  transform: translateX(10%)    }
}

div.anchor {
  position: absolute;
}
</style>