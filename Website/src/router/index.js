import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/public/Home.vue';
import Uptime from '../views/public/Uptime.vue';
import GuildSelect from '../views/dashboard/GuildSelect.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/uptime',
        name: 'Uptime',
        component: Uptime,
    },
    {
        path: '/dashboard',
        name: 'GuildSelect',
        component: GuildSelect,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
