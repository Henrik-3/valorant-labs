<template>
    <div class="grow flex flex-col items-center text-center translate-y-0 transition-transform duration-x ease-in-out translate-x-0">
        <section class="flex items-center text-center min-h-screen">
            <div class="items-center text-center">
                <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white">VALORANT LABS</h1>
                <p class="text-xl text-gray-400 mb-4">Multilanguage VALORANT Discord Bot. Stats, Autonews and Server Status from first hand, made with much love</p>
                <div>
                    <a class="btn text-white shrink-0 mr-2" href="/invite/discord" target="_blank" style="background-color: #404eed">
                        <i class="fa-brands fa-discord mr-2"></i>Einladen
                    </a>
                    <a class="btn text-white shrink-0 mr-2" href="/invite/guilded" target="_blank" style="background-color: #f5c400">
                        <i class="fa-brands fa-guilded mr-2"></i>Einladen
                    </a>
                    <a class="btn text-white shrink-0 mr-2" href="https://www.patreon.com/henrikdev" target="_blank" style="background-color: #f1465a">
                        <i class="fa-brands fa-patreon mr-2"></i>Spenden
                    </a>
                </div>
            </div>
        </section>
    </div>
    <custom-footer></custom-footer>
</template>

<script>
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CustomFooter from '../../components/footer.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
dayjs.locale('de');
dayjs.extend(localizedFormat);

export default {
    name: 'Home',
    components: {CustomFooter},
    data() {
        return {
            featured_guilds: [],
        };
    },
    async created() {
        console.log(process.env);
        this.featured_guilds = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/featured`).catch(e => e)).data ?? [];
    },
    methods: {},
};
</script>
