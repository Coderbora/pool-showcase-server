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
            normalColor: "",
            accentColor: "",
            textFont: "",

            map: {
                listImage: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },

                title: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                songName: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                version: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                
                cs: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                ar: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                od: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                hp: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                length: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                bpm: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                sr: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
            
                mapID: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
            },

            player: {
                playerAvatar: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
    
                username: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                rank: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                
                count300: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                count100: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                count50: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                countMiss: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
            
                maxCombo: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                accuracy: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
                },
                score: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    mode: "normal"
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