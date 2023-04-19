<template>
    <header class="absolute w-full z-30 p-4" style="backdrop-filter: blur(5px)">
        <div class="w-full px-4 sm:px-6">
            <div class="flex items-center justify-between h-20">
                <!-- Site branding -->
                <div class="shrink-0 mr-5">
                    <!-- Logo -->
                    <a class="block">
                        <router-link :to="{name: 'Home'}" class="text-white text-white flex items-center transition duration-150 ease-in-out cursor-pointer"
                            ><img src="https://valorantlabs.xyz/logo.png" class="w-12 h-12"
                        /></router-link>
                    </a>
                </div>

                <!-- Desktop navigation -->
                <nav class="flex grow">
                    <!-- Desktop menu links -->
                    <ul class="flex grow flex-wrap items-center font-medium justify-center">
                        <li>
                            <router-link
                                v-if="'deactivate' == true"
                                :to="{name: 'GuildSelect'}"
                                class="text-white text-white px-5 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer"
                                target="_blank"
                                disabled
                                ><i class="fa-solid fa-gears mr-2"></i>Dashboard</router-link
                            >
                            <p v-else class="text-white text-white px-5 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer">
                                <i class="fa-solid fa-gears mr-2"></i>Dashboard (WIP)
                            </p>
                        </li>
                        <li>
                            <a
                                class="text-white text-white px-5 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer"
                                href="https://github.com/Henrik-3/valorant-labs"
                                target="_blank"
                                ><i class="fa-brands fa-github mr-2"></i>Github</a
                            >
                        </li>
                        <li>
                            <a
                                class="text-white text-white px-5 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer"
                                href="https://discord.gg/X3GaVkX2YN"
                                ><i class="fa-solid fa-circle-question mr-2"></i>Support</a
                            >
                        </li>
                        <li>
                            <router-link
                                :to="{name: 'Uptime'}"
                                class="text-white text-white px-5 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer"
                                ><i class="fa-solid fa-globe mr-2"></i>Uptime</router-link
                            >
                        </li>
                    </ul>
                </nav>
                <div class="w-48">
                    <single-select
                        v-if="selected_lang"
                        :selected="selected_lang"
                        :etype="'strings'"
                        :strings="languages.map(i => i.name)"
                        :disable_clear="true"
                        :emit="true"
                        @emit="$event => selectLang($event)"
                    >
                    </single-select>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import SingleSelect from './singleselect_frontend.vue';
import axios from 'axios';

export default {
    name: 'navbar',
    props: {
        image: {
            String,
        },
    },
    async created() {
        const languages = await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/list`).catch(e => e);
        this.languages = languages.data;
        this.selected_lang = this.languages?.find(i => i.language == this.getCookie('lang'))?.name ?? 'English (US)';
    },
    data() {
        return {
            languages: [],
            selected_lang: null,
        };
    },
    components: {
        SingleSelect,
    },
    methods: {
        scrollto(element) {
            document.getElementById(element).scrollIntoView();
        },
        getCookie(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        selectLang(lang) {
            this.$emit('lang', this.languages.find(i => i.name == lang).language);
        },
    },
};
</script>
