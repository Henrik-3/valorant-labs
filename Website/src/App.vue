<template>
    <div class="flex h-screen overflow-hidden">
        <side-bar v-if="getRoute().includes('dashboard')"></side-bar>
        <nav-bar v-if="!getRoute().includes('dashboard')"></nav-bar>
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <custom-header v-if="getRoute().includes('dashboard')"></custom-header>
            <router-view />
        </div>
    </div>
</template>

<script>
import CustomHeader from './components/header.vue';
import SideBar from './components/sidebar.vue';
import NavBar from './components/navbar.vue';
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';

export default {
    components: {SideBar, CustomHeader, Skeleton, SkeletonTheme, NavBar},
    methods: {
        getRoute() {
            return this.$route.path;
        },
    },
};
</script>
