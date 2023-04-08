<template>
    <div class="flex h-screen overflow-hidden">
        <side-bar></side-bar>
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <custom-header></custom-header>
            <router-view />
        </div>
    </div>
</template>

<script>
import CustomHeader from './components/header.vue';
import SideBar from './components/sidebar.vue';
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';

export default {
    components: {SideBar, CustomHeader, Skeleton, SkeletonTheme},
};
</script>
