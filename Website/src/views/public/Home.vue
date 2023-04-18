<template>
    <div class="grow flex flex-col items-center text-center translate-y-0 transition-transform duration-x ease-in-out translate-x-0">
        <section class="flex items-center text-center min-h-screen">
            <div class="items-center text-center">
                <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white">VALORANT LABS</h1>
                <p class="text-xl text-gray-400 mb-4">{{ getTranslation('mainpage.description') }}</p>
                <div>
                    <a class="btn text-white shrink-0 mr-2 mb-2" href="/invite/discord" target="_blank" style="background-color: #404eed">
                        <i class="fa-brands fa-discord mr-2"></i>{{ getTranslation('mainpage.invite') }}
                    </a>
                    <a class="btn text-white shrink-0 mr-2" href="/invite/guilded" target="_blank" style="background-color: #f5c400">
                        <i class="fa-brands fa-guilded mr-2"></i>{{ getTranslation('mainpage.invite') }}
                    </a>
                    <a class="btn text-white shrink-0 mr-2" href="https://www.patreon.com/henrikdev" target="_blank" style="background-color: #f1465a">
                        <i class="fa-brands fa-patreon mr-2"></i>{{ getTranslation('mainpage.donate') }}
                    </a>
                </div>
            </div>
        </section>
        <section class="flex flex-col items-center text-center w-full mb-20">
            <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold val_gradient">{{ getTranslation('mainpage.trust.title') }}</h1>
            <p class="text-xl val_gradient mb-16">{{ getTranslation('mainpage.trust.description') }}</p>
            <div class="grid grid-cols-auto-0-400 gap-2 text-center mb-20 w-full px-20 justify-center">
                <div v-for="guild of featured_guilds" :key="guild" class="flex flex-col overflow-hidden w-full bg-gray-3 rounded-xl">
                    <div class="h-15">
                        <img v-if="guild.bannerURL || guild.splashURL" class="object-cover h-full w-full" :src="(guild.bannerURL ?? guild.splashURL) + '?size=1024'" />
                        <div v-else class="object-cover h-full w-full" style="background-color: #202020"></div>
                    </div>
                    <div class="flex flex-col p-4">
                        <div class="flex flex-col items-center mb-2 text-left">
                            <div class="flex items-center mb-2" style="margin-right: auto">
                                <img v-if="guild.iconURL" class="h-full w-full rounded-xl mr-2 text-left" :src="guild.iconURL" style="width: 32px; height: 32px" />
                                <p class="text-s text-white text-left">{{ guild.name }}</p>
                            </div>
                            <div class="flex items-center text-left" style="margin-right: auto">
                                <svg aria-hidden="true" role="img" class="mr-2" width="16" height="16" viewBox="0 0 24 24" style="color: white">
                                    <path
                                        fill="currentColor"
                                        d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
                                    ></path>
                                </svg>
                                <p class="text-xs text-white">{{ localString(guild?.memberCount ?? 0) }} {{ getTranslation('mainpage.trust.members') }}</p>
                            </div>
                        </div>
                        <div v-show="guild.description" class="text-white text-xs text-left" :class="guild.vanityURLCode ? 'mb-4' : ''">
                            {{ guild.description }}
                        </div>
                        <div v-show="guild.vanityURLCode" class="text-left">
                            <a class="btn text-white shrink-0 mr-2 bg-gray-2" :href="`https://discord.gg/${guild.vanityURLCode}`" target="_blank">
                                <i class="fa-brands fa-discord mr-2"></i>{{ getTranslation('mainpage.join') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="flex flex-col items-center text-center w-full mb-20 mt-20">
            <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold val_gradient">{{ getTranslation('mainpage.numbers.title') }}</h1>
            <p class="text-xl val_gradient mb-16">{{ getTranslation('mainpage.numbers.description') }}</p>
            <div class="grid grid-cols-auto-0-400 gap-2 text-center mb-20 w-full px-20">
                <div class="bg-gray-3 py-8 rounded-xl">
                    <i class="fa-sharp fa-solid fa-server text-white fa-xl mb-4"></i>
                    <div class="text-white text-3xl font-extrabold tracking-tighter mb-1" data-v-5fd9d94b="">{{ localString(stats?.guilds ?? 0) }}</div>
                    <div class="val_gradient dark:text-gray-400" data-v-5fd9d94b="">{{ getTranslation('mainpage.numbers.guilds') }}</div>
                </div>
                <div class="bg-gray-3 py-8 rounded-xl">
                    <i class="fa-solid fa-user text-white fa-xl mb-4"></i>
                    <div class="text-white text-3xl font-extrabold tracking-tighter mb-1" data-v-5fd9d94b="">{{ localString(stats?.member ?? 0) }}</div>
                    <div class="val_gradient dark:text-gray-400" data-v-5fd9d94b="">{{ getTranslation('mainpage.numbers.user') }}</div>
                </div>
                <div class="bg-gray-3 py-8 rounded-xl">
                    <i class="fa-solid fa-circle-nodes text-white fa-xl mb-4"></i>
                    <div class="text-white text-3xl font-extrabold tracking-tighter mb-1" data-v-5fd9d94b="">{{ localString(stats?.shards ?? 0) }}</div>
                    <div class="val_gradient dark:text-gray-400" data-v-5fd9d94b="">{{ getTranslation('mainpage.numbers.shards') }}</div>
                </div>
                <div class="bg-gray-3 py-8 rounded-xl">
                    <i class="fa-solid fa-microchip text-white fa-xl mb-4"></i>
                    <div class="text-white text-3xl font-extrabold tracking-tighter mb-1" data-v-5fd9d94b="">{{ localString(stats?.commands ?? 0) }}</div>
                    <div class="val_gradient dark:text-gray-400" data-v-5fd9d94b="">{{ getTranslation('mainpage.numbers.commands') }}</div>
                </div>
            </div>
        </section>
        <section class="flex flex-col items-center text-center w-full mb-20 mt-20" v-if="commands.length">
            <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold val_gradient">{{ getTranslation('mainpage.commands.title') }}</h1>
            <p class="text-xl val_gradient mb-16">{{ getTranslation('mainpage.commands.description') }}</p>
            <div id="content" class="w-full sm:space-y-6 px-20">
                <div class="shadow-lg rounded-xl mb-8 bg-gray">
                    <div class="overflow-x-auto rounded-xl">
                        <table class="table-auto w-full">
                            <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-badge">
                                <tr>
                                    <th class="px-2 py-3 vertical-align-middle">
                                        <div class="font-semibold text-center text-white">{{ getTranslation('mainpage.commands.table.command') }}</div>
                                    </th>
                                    <th class="px-2 py-3 vertical-align-middle">
                                        <div class="font-semibold text-center text-white">{{ getTranslation('mainpage.commands.table.type') }}</div>
                                    </th>
                                    <th class="px-2 py-3 vertical-align-middle">
                                        <div class="font-semibold text-center text-white">{{ getTranslation('mainpage.commands.table.description') }}</div>
                                    </th>
                                    <th class="px-2 py-3 vertical-align-middle">
                                        <div class="font-semibold text-center text-white">{{ getTranslation('mainpage.commands.table.docs') }}</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr v-for="command of commands" :key="command">
                                    <td class="px-2 py-3 vertical-align-middle">
                                        <div class="flex items-center justify-center">
                                            <div class="font-medium text-white">{{ command.type == 'ChatInput' ? '/' : '' }}{{ command.name }}</div>
                                        </div>
                                    </td>
                                    <td class="px-2 py-3 vertical-align-middle">
                                        <div class="flex items-center justify-center">
                                            <div class="font-medium text-white">{{ command.type }}</div>
                                        </div>
                                    </td>
                                    <td class="px-2 py-3 vertical-align-middle">
                                        <div class="flex items-center justify-center">
                                            <div class="font-medium text-white">{{ command.description }}</div>
                                        </div>
                                    </td>
                                    <td class="px-2 py-3 vertical-align-middle">
                                        <div class="flex items-center justify-center" v-if="command.type == 'ChatInput'">
                                            <div class="text-left">
                                                <a
                                                    class="btn text-white shrink-0 mr-2 bg-gray-2"
                                                    :href="`https://docs.valorantlabs.xyz/commands/${command.name}`"
                                                    target="_blank"
                                                >
                                                    <i class="fa-solid fa-book mr-2"></i>{{ getTranslation('mainpage.commands.table.docs') }}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <section class="mb-20 mt-20">
            <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold hdev_gradient">{{ getTranslation('mainpage.support.title') }}</h1>
            <p class="text-xl hdev_gradient mb-16">{{ getTranslation('mainpage.support.description') }}</p>
            <div class="flex rounded-xl overflow-hidden justify-center h-50-screen px-20">
                <div class="flex px-12 py-12 flex-col text-left bg-gray-3 rounded-xl w-content justify-center">
                    <h1 class="h1 text-2xl mb-4 font-extrabold hdev_gradient">{{ getTranslation('mainpage.support.help.title') }}</h1>
                    <p class="text-xl hdev_gradient mb-16" style="line-break: anywhere">{{ getTranslation('mainpage.support.help.description') }}</p>
                    <a class="btn text-white shrink-0 mr-2 hdev_gradient-bg" href="https://discord.gg/X3GaVkX2YN" target="_blank">
                        <i class="fa-brands fa-discord mr-2"></i>{{ getTranslation('mainpage.join') }}
                    </a>
                </div>
                <div style="width: calc(100% - 400px)">
                    <img class="object-cover h-full w-full" src="https://media.discordapp.net/attachments/705516265749348382/1097904242691416125/ServerYellow.png" />
                </div>
            </div>
        </section>
    </div>
    <custom-footer></custom-footer>
</template>

<style scoped>
.val_gradient {
    background-image: linear-gradient(310deg, #d60808, #ff6690);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hdev_gradient {
    background-image: linear-gradient(310deg, #eb6a0a, #edcf27);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hdev_gradient-bg {
    background-image: linear-gradient(310deg, #eb6a0a, #edcf27);
}

.val_gradient-bg {
    background-image: linear-gradient(310deg, #d60808, #ff6690);
}
</style>

<script>
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CustomFooter from '../../components/footer.vue';
import SingleSelect from '../../components/singleselect_frontend.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
dayjs.locale('de');
dayjs.extend(localizedFormat);

export default {
    name: 'Home',
    components: {CustomFooter},
    props: ['lang'],
    watch: {
        async lang(newLang, oldLang) {
            if (oldLang != newLang) {
                this.llang = newLang;
                this.i18n = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/${newLang}`).catch(e => e)).data ?? {};
                this.commands = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/commands?lang=${newLang}`).catch(e => e)).data ?? {};
            }
        },
    },
    data() {
        return {
            featured_guilds: [],
            stats: {},
            llang: this.getCookie('lang') ?? 'en',
            i18n: {},
            commands: [],
        };
    },
    async created() {
        console.log(this.getCookie('lang'));
        this.featured_guilds = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/featured`).catch(e => e)).data ?? [];
        this.stats = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/stats`).catch(e => e)).data ?? {};
        this.i18n = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/${this.llang}`).catch(e => e)).data ?? {};
        this.commands = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/commands?lang=${this.llang}`).catch(e => e)).data ?? {};
    },
    methods: {
        localString(num) {
            return num.toLocaleString();
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
        getTranslation(name) {
            let object = this.i18n;
            const split = name.split('.');
            for (let i = 0; split.length > i; i++) {
                if (typeof object != 'object') {
                    object = null;
                    break;
                }
                object = object[split[i]];
            }
            return object ?? name;
        },
        setCookie(name, value) {
            document.cookie = `${name}=${value}; path=/`;
        },
    },
};
</script>
