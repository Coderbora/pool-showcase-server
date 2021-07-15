import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import * as types from './main_types';

export interface Map {
    id: number,

    title: string,
    artist: string,
    version: string,
    img_url: string,

    diff: {
        cs: number,
        hp: number,
        od: number,
        ar: number,
        sr: number
    },

    length: number,
    bpm: number,

    modpool: "NM" | "HD" | "HR" | "DT" | "FM" | "TB",
    modpool_id: number,

    playedBy: Player | undefined
}

export interface Player {
    username: string,
    rank: "XH" | "X" | "SH" | "S" | "A" | "B" | "C" | "D" | "F",

    count: {
        "300": number,
        "100": number,
        "50": number,
        "0": number
    },

    maxcombo: number,
    accuracy: number,
    score: number
}

export interface MainState {
    initialized: boolean,
    apiKey: string,

    showcasePool: Map[],
}

export const store = createStore<MainState>({
    plugins: [
        createPersistedState(),
    ],
    state: {
        initialized: false,
        apiKey: "",
        showcasePool: []
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
        }
    },
    actions: {
        [types.UPDATE_API_KEY]({ commit }, apiKey: string) {
            commit(types.UPDATE_API_KEY, apiKey);
        },
        [types.UPDATE_POOL]({ commit }, pool: Map[]) {
            commit(types.UPDATE_POOL, pool);
        },
    }
});