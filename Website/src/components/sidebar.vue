<template>
    <SkeletonTheme color="#29313c" highlight="rgba(255, 255, 255, 0.25)">
        <div style="max-width: 16rem !important">
            <div
                id="shadow"
                class="fixed inset-0 bg-gray bg-opacity-30 z-40 lg:hidden transition-opacity duration-200 opacity-0 pointer-events-none"
                aria-hidden="true"
            ></div>
            <div
                id="sidebar"
                class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 shrink-0 bg-gray-2 p-4 transition-all duration-200 ease-in-out -translate-x-64 rounded-xl"
                :class="extended ? 'lg:sidebar-expanded:!w-64' : ''"
                @mouseenter="if (!extended) extended = true;"
                @mouseleave="if (extended) extended = false;"
            >
                <div class="flex justify-between mb-10 pr-3 sm:px-2">
                    <button class="lg:hidden text-gray-500 hover:" aria-controls="sidebar" aria-expanded="false" @click="close()">
                        <span class="sr-only">Close sidebar</span
                        ><svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"></path>
                        </svg>
                    </button>
                    <router-link :to="{name: 'Home'}" class="flex items-center align-center">
                        <img src="https://cdn.discordapp.com/attachments/724897065821536257/1055798959689437234/GG_red_0.1_transparent.png" height="32" width="32" />
                        <p v-if="extended" class="text-white ml-2">v2.7.5 | Build 65</p>
                    </router-link>
                </div>
                <div class="flex h-full items-center">
                    <div class="space-y-8 w-full">
                        <div>
                            <ul v-if="guild?.id" class="mt-3">
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl" :class="active == 'overview' ? `bg-gray` : ``">
                                    <a class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200"
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.dashboard" width="24" height="24" />
                                                <router-link class="block transition duration-150 truncate" :to="{name: 'Overview', params: {id: guild.id}}">
                                                    <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                        >Dashboard</span
                                                    >
                                                </router-link>
                                            </div>
                                        </div></a
                                    >
                                </li>
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl" :class="active == 'tickets' ? `bg-gray` : ``">
                                    <a class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200"
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.tickets" width="24" height="24" />
                                                <router-link class="block transition duration-150 truncate" :to="{name: 'tickets', params: {id: guild.id}}">
                                                    <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                        >Tickets</span
                                                    >
                                                </router-link>
                                            </div>
                                        </div></a
                                    >
                                </li>
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl" :class="active == 'forms' ? `bg-gray` : ``">
                                    <a class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200"
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.formulare" width="24" height="24" />
                                                <router-link class="block transition duration-150 truncate" :to="{name: 'forms', params: {id: guild.id}}">
                                                    <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                        >Formulare</span
                                                    >
                                                </router-link>
                                            </div>
                                        </div></a
                                    >
                                </li>
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl">
                                    <a
                                        class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200 mb-2"
                                        :class="
                                            ['joinleftlogs', 'userlogs', 'rolelogs', 'voicelogs', 'messagelogs', 'moderationlogs'].some(i => i == active) ? `bg-gray` : ``
                                        "
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.logs" width="24" height="24" />
                                                <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                    >Logs</span
                                                >
                                            </div>
                                        </div></a
                                    >
                                    <div class="sidebar__body" v-if="extended || extended_mobile">
                                        <a class="sidebar__link pl-2 mb-2 text-white" :class="active == 'joinleftlogs' ? `bg-gray rounded` : ``"
                                            ><router-link class="block transition duration-150 truncate" :to="{name: 'joinleftlogs', params: {id: guild.id}}">
                                                <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                    >Join Left</span
                                                >
                                            </router-link></a
                                        ><a class="sidebar__link pl-2 mb-2 text-white" :class="active == 'userlogs' ? `bg-gray rounded` : ``"
                                            ><router-link class="block transition duration-150 truncate" :to="{name: 'userlogs', params: {id: guild.id}}">
                                                <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">User</span>
                                            </router-link></a
                                        >
                                        <a class="sidebar__link pl-2 mb-2 text-white" :class="active == 'rolelogs' ? `bg-gray rounded` : ``"
                                            ><router-link class="block transition duration-150 truncate" :to="{name: 'rolelogs', params: {id: guild.id}}">
                                                <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Rollen</span>
                                            </router-link></a
                                        >
                                        <a class="sidebar__link pl-2 mb-2 text-white" :class="active == 'voicelogs' ? `bg-gray rounded` : ``"
                                            ><router-link class="block transition duration-150 truncate" :to="{name: 'voicelogs', params: {id: guild.id}}">
                                                <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Voice</span>
                                            </router-link></a
                                        >
                                        <a class="sidebar__link pl-2 mb-2 text-white" :class="active == 'messagelogs' ? `bg-gray rounded` : ``"
                                            ><router-link class="block transition duration-150 truncate" :to="{name: 'messagelogs', params: {id: guild.id}}">
                                                <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                    >Messages</span
                                                >
                                            </router-link></a
                                        >
                                        <a class="sidebar__link pl-2 mb-2 text-white" :class="active == 'moderationlogs' ? `bg-gray rounded` : ``"
                                            ><router-link class="block transition duration-150 truncate" :to="{name: 'moderationlogs', params: {id: guild.id}}">
                                                <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                    >Moderation</span
                                                >
                                            </router-link></a
                                        >
                                    </div>
                                </li>
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl" v-if="guild?.admin" :class="active == 'serversettings' ? `bg-gray` : ``">
                                    <a class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200"
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.settings" width="24" height="24" />
                                                <router-link class="block transition duration-150 truncate" :to="{name: 'serversettings', params: {id: guild.id}}">
                                                    <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                        >Einstellungen</span
                                                    >
                                                </router-link>
                                            </div>
                                        </div></a
                                    >
                                </li>
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl" :class="active == 'membersearch' ? `bg-gray` : ``">
                                    <a class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200"
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.member" width="24" height="24" />
                                                <router-link class="block transition duration-150 truncate" :to="{name: 'membersearch', params: {id: guild.id}}">
                                                    <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                        >Member Lookup</span
                                                    >
                                                </router-link>
                                            </div>
                                        </div></a
                                    >
                                </li>
                            </ul>
                            <ul v-else class="mt-3">
                                <li class="px-3 py-2 rounded-sm mb-2 last:mb-0 rounded-xl bg-gray">
                                    <a class="block text-gray-200 hover:text-white truncate transition duration-150 hover:text-gray-200"
                                        ><div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <img :src="images.dashboard" width="24" height="24" />
                                                <router-link class="block transition duration-150 truncate" :to="{name: 'Home'}">
                                                    <span class="text-sm ml-2 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                                        >Dashboard</span
                                                    >
                                                </router-link>
                                            </div>
                                        </div></a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    <div class="px-3 py-2" @click="expand()">
                        <button>
                            <span class="sr-only">Expand / collapse sidebar</span
                            ><svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                                <path class="" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"></path>
                                <path class="text-gray-600" d="M3 23H1V1h2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </SkeletonTheme>
</template>

<style src="@/assets/dashboard.css"></style>

<script>
import axios from 'axios';
import {Skeleton, SkeletonTheme} from 'vue-loading-skeleton';

export default {
    name: 'custom_header',
    props: {},
    components: {
        Skeleton,
        SkeletonTheme,
    },
    data() {
        return {
            images: {
                dashboard:
                    'data:image/webp;base64,UklGRrQBAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSJEAAAABgKtt+/nmyy+jeQq2nbOzndodu2u1DsB2u8bJ96vxrV0iYgIAgJnSO3ePv367GdMK4KOs2Eb+p9iMiwBAtoz8z3FJBKyGnCAmmKvLSbZ0daSBiUNOdKdF5aFH5eX/UpvK4ymVg0mkgfnwgEbXJlxAClhjoFmnsCYHAPXiAP8Ge+MK+CiMzlx0h7/ePR3zMQAAAFZQOCD8AAAA0AcAnQEqKAAoAD5tLJNGpCIhoTHTOgCADYlpABOIFqAVnFos01/+tfhyWi/7RlClL7vPJZiksRr4j64x6Lc/3+ynUDH6dXAA/v4X1wpkrb6baZ37jZFu4mXsp/l/lNJkbYfnXzz2Hntcgd+GffJK0u2T54AXz+GPg4Uo3Gv/AnbgTgeMoKlvXNAv5HxYGp4CJchX7HdrcOXdNyBUO83fv05Bh8rJD/Df203hpl5kb/dwZIEYSbkayreFSkPijWUBPjNLxluPC95LUTdJWMs+/a3L3TI0xzMqcXXKKp5V0BdAqj5OyZJ/KzsM4CA7XjzIzSwKfjc7x3UHAAAA',
                tickets:
                    'data:image/webp;base64,UklGRrYBAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSIUAAAABcFzb1vHc9WX+q46YTdpsw+pAI9VgO++L8aaZRMQEABDmQGc8//qkG7YLPCqhPcmf0iGpAVAKJH9ONR0iRJIhpYV5L1ke3X7iQcmWZDoYcVlPuez/l0Zc1m0uwyDxoLR1z+PoEzHiQHkT1DIxaBoAtMSBfkPHvIFH4Yj1ltuvr/pJjwAAAFZQOCAKAQAA0AYAnQEqKAAoAD5tLJFGJCIhoTVSuACADYlpAARBskUqG1U6JX6M8ej+P2RVGWzyACHUh0qRlx7L6FFQdw9AAP7+F9UMjwm+vAfp3Y/cNnNNl5IenoK/8ivrXY89Yoph6fBrUrvEP+BZ1EJ97//jF540+UxLtqYTQ0oPyB2coNKmhOFrSON93hvubxltR+h0YGR2GyQR6+R1akF8UVBGUvHY4/xt+7wtM9PNnbVN5tPGneN6eYVVGqh6ZCk+2XCghsoYhCOY5ddaMxNB6XDFKyrF8Ekyq7J2IDBT9Kpzkbgb70Di29CkIc6q75ltGYQ1S4826MFYMWQKHZFzxuKtp0QzG8UvREjgAAA=',
                formulare:
                    'data:image/webp;base64,UklGRnQBAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSIkAAAABcGPbtpq89VPjo3DXKbq7zYEOOmqrbQTexZP3cchraSJiAgBAyPb2ovpzcdtKMHj2jHXklqLWcQKAZ86tx5kThDES4NhgWZ2TVMM9pIGlPSe6FqkcFSrX/yWRynFDZdlCGpiLqzRkH2sjBSwwcE7ROpzYAMBRV9AiOW+DZxYsro6Xnx8WOS8DAABWUDggxAAAAFAHAJ0BKigAKAA+ZSqORaQioRjmAEAGRLSACecKIB+Gd0kx+44P+21eGWVBtAmcdSKqKKO4W9vxwZzib/Q4cH2f2UAA/v3esHoUaHDtXtLpUH/CqnR66+4FoadYl6qWroc4FnTai03Ab9xsDIGHqlPYPMfooOyLfUVsZmMafxxNxO1ADxr0DLmtuCvX7UWlHlAgLTrwFilprLrXJC8iRAN22kqdcOyAhPxhLOnqRgWE8+BCJLZN3QQC5+MIFQu/WHb58AA=',
                logs: 'data:image/webp;base64,UklGRsABAABXRUJQVlA4WAoAAAAQAAAAKwAAKwAAQUxQSJUAAAABcGLb1rLcL/3IkFg0ye4kZuYuI3F3je6k7/tw+F8mRMQEAIBiDXeWKxWXnbBVwUtmKHEhVRa8bGAAmO8gSR78DDAeJNGDEZqKJFvVODkd7kwIOiI5lIRHO0r7A6XDf4k9pf2Y0jgj6IiMl9PhPl2LTksH04nKyQSw0JnGOcQAMHObq8c7FoaX+kBxcbmqeFkUg3oAAABWUDggBAEAAFAHAJ0BKiwALAA+ZSyQRaQioZqsBVRABkS0gAQIF0TpV/y00vVlneirMxAhkcy98aAvU4yXRulem+YPDEoeKscA5gAA/v3e3S4zk7xZfLOWC+BKA/v96DvWUoGoUuCVRXzBZHJCSCWJxWHsRvCHErUbro7oe0L9qb5ohGTziPKADivWb1bmsNiaGvKp06859s7jN5L78HDwr/0i35ZAdOq3B+rj5HgPU2WRqK4fCZ0MOWUKgi27db/1EaCq6bioLevg4UZsvZtiwJXWTlPIllpAkV+TGvGfHntbBkqYu2ksOk6CQY3+8vixKevC7UuctpASF04iVLP//8dSSijsD5jwIAAA',
                settings:
                    'data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAQAAAAKwAAKwAAQUxQSH4AAAABf6AokqQ2ezkSXkhACT8iIgD3Oxj/4sA0RDitbduJHosGUgtRQgv0QQdUkEMhWMrAYVEUgUKGSc/NHD0qov8EkjZbhe8hRNLpo189Ck9E4l1/OppiLQrMjeRFWN1BkdHGyE5G+2TMH8ahfx3pkunqaSG0JloerZQWTeuHTyFWUDggaAEAAFAJAJ0BKiwALAA+bSqURiQiIiEqtV1QgA2JaQATlyulrI6yrjtWWt2qf/f21fZD7bJGtbtQ51LmvtxEWMIxySSY+D5ptj3szBIRQnsLunhXI3wAAP7+UzMDcCdTqsZ8YZgreyDD3280Nu6v+0dxIGHwKOW/j3l5V7SLnz2s6aalK5XzsOY+iGA8oi1b807RZMeFIMeiDHVqX9JEFizXq767DDwBicZ6FtEKdzeC9AWbRNlYqkwzXOhyvlNJnhZkIMlle/OwLeFMT6qVy/HlpS6FQnilBcl/C60Bo8OXzD/AjX6cuFG5qHpMvBwgNnBtkp3rjXyYqIinAFzrd9gqgkvzjnoLbZdOf65n/N2ndL2Lcx72oKCAEeLgyhq0BJz0A4uCDdqDLAr1RGkllberXqs8k+frRX8h1d61a2gW0rfrQxgXQbbWNdWgVm0Puw7vcU6H9SR4GGm2/FLpbzoh/aXtU9W2fFlwAA==',
                member: 'data:image/webp;base64,UklGRtwBAABXRUJQVlA4WAoAAAAQAAAAKwAAKwAAQUxQSJgAAAABgGPb2rHn/taIbJS2NTD/MQZi2+VvV+/7xsn31CkiYgIAQBNqXHZ7EnYvagE1vpRZDxkXEnO2Z5QBkGWnguQ4KQPsU0F0bILuRJDd1yQYHRZa53R480kQvp5S6s8pDf+XmFIaPFO63SbEVzKMDosbLumc6uCfU5m5AFl1TmNWlAGQ+a+YdOzcI8OXhtzu62Ip4eJ1O60HAFZQOCAeAQAA8AYAnQEqLAAsAD5tNJNHpCMhoSOM+IANiWkA06NvA2TLAt3MXQyhkQ3U9emQDPR0iB6eIs8j1mUJlcAH5oY/AAD+/olYEKWYeCT6AzQQa6sRFlqcEBFyhxf8/J1/jr+CRmL5jifJm4mG1VWdmp1NNrlWALIbYJrSz+wqpbHojEjeAr32+fnf1ZyiNToe9IYLkN+FszXNaJnXmPPrnxO38V1PJgPfLXR7zCOGFdjtJ/ZtpdcATl0OFeTB8xX8O7/6Y814Ejn9fVXGVWI66EP8anQbeR72K4dHIahBsVIJ3JLTc4EUfBNSEal92Dwmqv/NM7KQYEndR9RHJZhbH45O3C2G6S0pocjhncgSWh/tTP3GAxos99jVeFqvmJAAAA==',
            },
            guild: {},
            active: null,
            extended: true,
            extended_mobile: false,
        };
    },
    watch: {
        async $route(to, from) {
            if (to.params.id && to.params.id != this.guild.id) {
                console.log(to);
                const guild = await axios
                    .get(`https://dash.gforg.net/api/v1/guild/${to.params.id}?partial=false`, {
                        withCredentials: true,
                    })
                    .catch(e => e);
                this.guild = guild.data;
            } else if (!to.params.id) this.guild = {};
            this.active = to.name.toLowerCase();
        },
    },
    created() {
        setTimeout(() => {
            if (this.extended) this.extended = false;
        }, 2500);
    },
    mounted() {
        const mutationObserver = new MutationObserver(function (mutations) {
            const side_bar = mutations.find(i => i.target.id == 'open_sidebar');
            console.log(side_bar.target.ariaExpanded);
            if (side_bar) {
                if (side_bar.target.ariaExpanded == 'true') setAria(true);
                else setAria(false);
            }
        });
        const setAria = val => {
            console.log(val);
            this.extended_mobile = val;
            console.log(this.extended_mobile);
        };
        mutationObserver.observe(document.getElementById('open_sidebar'), {
            attributes: true,
        });
    },
    methods: {
        close() {
            if (document.getElementById('open_sidebar').ariaExpanded == 'false') {
                document.getElementById('open_sidebar').ariaExpanded = 'true';
                document.getElementById('sidebar').classList =
                    'flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-2 p-4 transition-all duration-200 ease-in-out translate-x-0 opacity-100';
                document.getElementById('shadow').classList =
                    'fixed inset-0 bg-gray bg-opacity-30 z-40 lg:hidden  transition-opacity duration-200 opacity-0 pointer-events-none';
            } else {
                document.getElementById('sidebar').classList =
                    'flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-2 p-4 transition-all duration-200 ease-in-out -translate-x-64 opacity-100';
                document.getElementById('shadow').classList =
                    'fixed inset-0 bg-gray bg-opacity-30 z-40 lg:hidden  transition-opacity duration-200 opacity-0 pointer-events-none';
                document.getElementById('open_sidebar').ariaExpanded = 'false';
            }
        },
        expand() {
            document.getElementById('open_sidebar').ariaExpanded = 'true';
            document.getElementById('sidebar').classList =
                'flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out translate-x-0';
            document.getElementById('shadow').classList =
                'fixed inset-0 bg-gray bg-opacity-30 z-40 lg:hidden transition-opacity duration-200 opacity-0 pointer-events-none';
        },
        checkInside(e) {
            if (!document.getElementById('sidebar').contains(e.target)) {
                this.close();
            }
        },

        pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
            if (!bgColor) return;
            const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
            const r = parseInt(color.substring(0, 2), 16); // hexToR
            const g = parseInt(color.substring(2, 4), 16); // hexToG
            const b = parseInt(color.substring(4, 6), 16); // hexToB
            return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
        },
    },
};
</script>
