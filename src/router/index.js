import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Sign from '@/views/Sign.vue';

Vue.use(Router);

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'login',
        path: '/entrar',
        component: Login
    },
    {
        name: 'sign',
        path: '/cadastrar',
        component: Sign
    }
]

const router = new Router({ 
    mode: 'history',
    routes 
})


export default router