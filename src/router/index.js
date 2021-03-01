import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Sign from '@/views/auth/Sign.vue';
import NotFound from '@/views/NotFound.vue';
import UploadAssignment from '@/views/assignment/UploadAssignment.vue';
import ViewAssignment from '@/views/assignment/ViewAssignment.vue';
import Remember from '@/views/auth/Remember.vue';

Vue.use(Router);

const routes = [
    {
        name: 'notFound',
        path: '*',
        component: NotFound,
        meta: { title: 'Pagina não encontrada' }
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: { title: 'Inicio' }
    },
    {
        name: 'login',
        path: '/entrar',
        component: Login,
        meta: { title: 'Entrar - 02'}
    },
    {
        name: 'sign',
        path: '/cadastrar',
        component: Sign,
        meta: { title: 'Cadastrar - 02'}
    },
    {
        name: 'uploadAssignment',
        path: '/nova-atividade',
        component: UploadAssignment,
        meta: { title: 'Enviar nova atividade' }
    }, 
    {
        name: 'viewAssignment',
        path: '/atividade/:id',
        component: ViewAssignment
    },
    {
        name: 'remember',
        path: '/recuperar-senha',
        component: Remember,
        meta: { title: 'Recuperar senha - 02' }
    },
]

const router = new Router({ 
    mode: 'history',
    routes 
})


export default router