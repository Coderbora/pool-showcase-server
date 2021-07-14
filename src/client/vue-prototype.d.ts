import { Store } from 'vuex';
import { MainState } from './store/main';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<MainState>;
    }
}