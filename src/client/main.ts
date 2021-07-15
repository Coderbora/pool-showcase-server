import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { store } from './store/main';
import App from './App.vue';

import Home from './pages/Home.vue';
import Main from './pages/Main.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/main', component: Main }
    ]
});


const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');