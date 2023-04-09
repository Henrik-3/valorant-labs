<template>
    <header class="sticky top-0 bg-gray z-30">
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 -mb-px">
                <div class="flex">
                    <button class="text-gray-500 hover:text-gray-600 lg:hidden" aria-controls="sidebar" aria-expanded="false" id="open_sidebar" @click="expand()">
                        <span class="sr-only">Open sidebar</span
                        ><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="5" width="16" height="2"></rect>
                            <rect x="4" y="11" width="16" height="2"></rect>
                            <rect x="4" y="17" width="16" height="2"></rect>
                        </svg>
                    </button>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="relative inline-flex" @click="open_menu()">
                        <Skeleton v-if="loading" style="margin-left: 10px" height="32px" width="100px" loading></Skeleton>
                        <button v-else class="inline-flex justify-center items-center group" aria-haspopup="true" aria-expanded="false">
                            <img
                                class="w-8 h-8 rounded-full"
                                :src="'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png'"
                                width="32"
                                height="32"
                                alt="User"
                            />
                            <div class="flex items-center truncate">
                                <span class="truncate ml-2 text-sm font-medium text-white"
                                    >{{ user?.username }}<span style="color: grey">#{{ user?.discriminator }}</span></span
                                ><svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                </svg>
                            </div>
                        </button>
                        <div
                            class="origin-top-right z-10 absolute top-full min-w-44 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0"
                            style="display: none; background-color: #262a2b"
                            ref="sub_menu"
                        >
                            <div class="pt-0.5 pb-2 px-3 mb-1 shadow-lg border-b border-gray-200">
                                <div class="font-medium text-white">
                                    {{ user?.username }}<span style="color: grey">#{{ user?.discriminator }}</span>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <router-link
                                        :to="{name: 'settings'}"
                                        class="router-link-active router-link-exact-active font-medium text-sm flex text-white items-center py-1 px-3"
                                        >Settings</router-link
                                    >
                                </li>
                                <li>
                                    <a
                                        aria-current="page"
                                        class="router-link-active router-link-exact-active font-medium text-sm text-white flex items-center py-1 px-3"
                                        @click="logout()"
                                        >Sign Out</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style src="@/assets/skeleton.css" scoped></style>

<script>
import axios from 'axios';
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';

export default {
    name: 'custom_header',
    components: {
        Skeleton,
        SkeletonTheme,
    },
    props: {},
    async created() {
        const user = await axios.get('https://dash.gforg.net/api/v1/auth', {withCredentials: true}).catch(e => e);
        if (user.response?.status == 401) return (window.location.href = user.response.data.redirect);
        this.user = user.data.user;
        this.loading = false;
    },
    data() {
        return {
            user: {},
            loading: true,
        };
    },
    methods: {
        open_menu() {
            if (this.$refs['sub_menu'].style.display == 'none') this.$refs['sub_menu'].style.display = 'block';
            else this.$refs['sub_menu'].style.display = 'none';
        },
        async logout() {
            await axios
                .delete('https://dash.gforg.net/api/v1/auth', {
                    withCredentials: true,
                })
                .catch(e => {
                    return e;
                });
            document.cookie = 'auth =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.reload();
        },
        expand() {
            if (document.getElementById('open_sidebar').ariaExpanded == 'false') {
                document.getElementById('open_sidebar').ariaExpanded = 'true';
                document.getElementById('sidebar').classList =
                    'flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-2 p-4 transition-all duration-200 ease-in-out translate-x-0 opacity-100';
                document.getElementById('shadow').classList =
                    'fixed inset-0 bg-gray bg-opacity-30 z-40 lg:hidden transition-opacity duration-200 opacity-0 pointer-events-none';
            } else {
                document.getElementById('sidebar').classList =
                    'flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-2 p-4 transition-all duration-200 ease-in-out -translate-x-64 opacity-100';
                document.getElementById('shadow').classList =
                    'fixed inset-0 bg-gray bg-opacity-30 z-40 lg:hidden transition-opacity duration-200 opacity-0 pointer-events-none';
                document.getElementById('open_sidebar').ariaExpanded = 'false';
            }
        },
    },
};
</script>
