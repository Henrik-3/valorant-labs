import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/public/Home.vue';
import Uptime from '../views/public/Uptime.vue';
import Tos from '../views/public/Tos.vue';
import Privacy from '../views/public/Privacy.vue';
import RSO from '../views/public/RSO.vue';
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
        path: '/tos',
        name: 'Tos',
        component: Tos,
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: Privacy,
    },
    {
        path: '/rso',
        name: 'RSO',
        component: RSO,
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
