import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import * as types from './main_types';

import { Map, ShowSettings } from '../../shared/types';

export interface MainState {
    initialized: boolean,
    apiKey: string,

    showcasePool: Map[],

    showSettings: ShowSettings,
}

export const store = createStore<MainState>({
    plugins: [
        createPersistedState(),
    ],
    state: {
        initialized: false,
        apiKey: "",
        showcasePool: [],

        showSettings: {
            normalColor: "#70D4FF",
            accentColor: "#FF5CFF",
            textFont: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap",
            defaultImage: "",

            map: {
                img_url: {
                    type: "image",
                    enabled: true,
                    top: 330,
                    left: 0,
                    width: 240,
                    height: 240,
                },

                artist: {
                    type: "text",
                    enabled: true,
                    top: 570,
                    left: 120,
                    mode: "accent",
                    size: 18,
                    maxWidth: 240,
                },
                songName: {
                    type: "text",
                    enabled: true,
                    top: 600,
                    left: 120,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                version: {
                    type: "text",
                    enabled: true,
                    top: 630,
                    left: 120,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                
                cs: {
                    type: "text",
                    enabled: true,
                    top: 692,
                    left: 77,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                ar: {
                    type: "text",
                    enabled: true,
                    top: 763,
                    left: 195,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                od: {
                    type: "text",
                    enabled: true,
                    top: 763,
                    left: 77,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                hp: {
                    type: "text",
                    enabled: true,
                    top: 692,
                    left: 195,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                mapLength: {
                    type: "text",
                    enabled: true,
                    top: 833,
                    left: 77,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                bpm: {
                    type: "text",
                    enabled: true,
                    top: 833,
                    left: 195,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                sr: {
                    type: "text",
                    enabled: true,
                    top: 900,
                    left: 132,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
            
                mapID: {
                    type: "text",
                    enabled: true,
                    top: 950,
                    left: 120,
                    mode: "accent",
                    size: 40,
                    maxWidth: 240,
                },
            },

            player: {
                playerAvatar: {
                    type: "image",
                    enabled: true,
                    top: 330,
                    left: 1680,
                    width: 240,
                    height: 240,
                },
    
                username: {
                    type: "text",
                    enabled: true,
                    top: 570,
                    left: 1800,
                    mode: "accent",
                    size: 18,
                    maxWidth: 240,
                },
                rank: {
                    type: "text",
                    enabled: true,
                    top: 600,
                    left: 1800,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                
                count300: {
                    type: "text",
                    enabled: true,
                    top: 672,
                    left: 1758,
                    mode: "normal",
                    size: 16,
                    maxWidth: 240,
                },
                count100: {
                    type: "text",
                    enabled: true,
                    top: 672,
                    left: 1880,
                    mode: "normal",
                    size: 16,
                    maxWidth: 240,
                },
                count50: {
                    type: "text",
                    enabled: true,
                    top: 742,
                    left: 1758,
                    mode: "normal",
                    size: 16,
                    maxWidth: 240,
                },
                countMiss: {
                    type: "text",
                    enabled: true,
                    top: 742,
                    left: 1880,
                    mode: "normal",
                    size: 16,
                    maxWidth: 240,
                },
            
                maxCombo: {
                    type: "text",
                    enabled: true,
                    top: 810,
                    left: 1800,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                displayAcc: {
                    type: "text",
                    enabled: true,
                    top: 875,
                    left: 1800,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
                displayScore: {
                    type: "text",
                    enabled: true,
                    top: 942,
                    left: 1800,
                    mode: "normal",
                    size: 18,
                    maxWidth: 240,
                },
            }
        }
    },
    mutations: {
        [types.SET_INITIALIZED] (state) {
            state.initialized = true;
        },
        [types.UPDATE_API_KEY] (state, apiKey: string) {
            state.apiKey = apiKey;
        },
        [types.UPDATE_POOL] (state, pool: Map[]) {
            state.showcasePool = pool;
        },
        [types.UPDATE_SHOW_SETTINGS] (state, showSettings: ShowSettings) {
            state.showSettings = showSettings;
        },
    },
    actions: {
        [types.UPDATE_API_KEY]({ commit }, apiKey: string) {
            commit(types.UPDATE_API_KEY, apiKey);
        },
        [types.UPDATE_POOL]({ commit }, pool: Map[]) {
            commit(types.UPDATE_POOL, pool);
        },
        [types.UPDATE_SHOW_SETTINGS]({ commit }, showSettings: ShowSettings) {
            commit(types.UPDATE_SHOW_SETTINGS, showSettings);
        },
    }
});