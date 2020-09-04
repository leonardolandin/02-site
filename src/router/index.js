import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';

Vue.use(Router);

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    }
]

const router = new Router({ 
    mode: 'history',
    routes 
})


export default router