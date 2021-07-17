import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import * as types from './main_types';

import { Map } from '../../shared/types';

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