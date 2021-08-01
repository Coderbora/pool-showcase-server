import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { store } from './store/main';
import App from './App.vue';

import Home from './pages/Home.vue';
import Main from './pages/Main.vue';
import Show from './pages/Show.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/main', component: Main },
        { path: '/show/:modpool', component: Show},
        { path: '/show/:modpool/:modpoolid', component: Show}
    ]
});


const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');