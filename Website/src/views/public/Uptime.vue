<template>
    <div class="grow flex flex-col translate-y-0 transition-transform duration-x ease-in-out translate-x-0">
        <section class="flex text-left items-center m-h-25 mt-20">
            <div class="ml-10-p">
                <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white flex">
                    {{ getTranslation('uptime.status') }}
                </h1>
                <p class="text-xl text-gray-400 mb-4">{{ getTranslation('uptime.sharding') }}</p>
            </div>
        </section>
        <section class="flex flex-col ml-10-p text-left w-full mb-20">
            <h1 class="h1 text-3xl mb-4 font-red-hat-display font-extrabold val_gradient">{{ getTranslation('uptime.find_shard.title') }}</h1>
            <p class="text-xl val_gradient mb-8">{{ getTranslation('uptime.find_shard.description') }}</p>
            <input
                :placeholder="getTranslation('uptime.find_shard.guild')"
                ref="serverid"
                @input="$event => updateShard($event)"
                maxlength="19"
                value=""
                class="s xq border-0 bg-gray-3 text-white rounded-xl w-content mb-8"
                type="number"
            />
            <div class="grid grid-cols-auto-0-200 gap-2 text-center mb-20 w-full">
                <div
                    v-for="shard of calculated_shard"
                    :key="shard"
                    class="bg-gray-3 py-8 rounded-xl"
                    :class="shard.status == 0 ? 'green_gradient-bg' : 'val_gradient-bg'"
                >
                    <div class="flex flex-col items-center text-left items-center ml-2" style="margin-right: auto">
                        <div class="items-center flex mb-2 li">
                            <i class="fa-solid fa-circle-nodes text-white fa-sm mr-2"></i>
                            <p class="text-xs text-white">#{{ shard.id }}</p>
                        </div>
                        <div class="items-center flex mb-2 li">
                            <i class="fa-solid fa-server text-white mr-2 fa-sm"></i>
                            <p class="text-xs text-white">{{ localString(shard.server ?? 0) }}</p>
                        </div>
                        <div class="items-center flex mb-2 li">
                            <i class="fa-solid fa-user text-white mr-2 fa-sm"></i>
                            <p class="text-xs text-white">{{ localString(shard.member ?? 0) }}</p>
                        </div>
                        <div class="items-center flex mb-2 li">
                            <i class="fa-solid fa-signal text-white mr-2 fa-2xs"></i>
                            <p class="text-xs text-white">{{ shard.ping }} ms</p>
                        </div>
                        <div class="items-center flex mb-2 li">
                            <i class="fa-solid fa-memory text-white mr-2 fa-2xs"></i>
                            <p class="text-xs text-white">{{ (shard.memory / 1024 / 1024).toFixed(2) }} MB</p>
                        </div>
                        <div class="items-center flex mb-2 li">
                            <i class="fa-solid fa-network-wired text-white mr-2 fa-2xs"></i>
                            <p class="text-xs text-white">{{ new Date(shard.ready_at).toLocaleString() }}</p>
                        </div>
                    </div>
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

.green_gradient-bg {
    background-image: linear-gradient(310deg, #233329, #63d471);
}

.val_gradient-bg {
    background-image: linear-gradient(310deg, #d60808, #ff6690);
}
</style>

<script>
import CustomFooter from '../../components/footer.vue';
import axios from 'axios';

export default {
    name: 'Home',
    components: {CustomFooter},
    props: ['lang'],
    watch: {
        async lang(newLang, oldLang) {
            if (oldLang != newLang) {
                this.llang = newLang;
                this.i18n = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/${newLang}`).catch(e => e)).data ?? {};
            }
        },
    },
    data() {
        return {
            llang: this.getCookie('lang') ?? 'en',
            i18n: {},
            shards: [],
            shard: null,
        };
    },
    async created() {
        this.i18n = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/${this.llang}`).catch(e => e)).data ?? {};
        this.shards = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/shards`).catch(e => e)).data ?? [];
    },
    computed: {
        calculated_shard() {
            if (this.shard) return this.shards.filter((i, index) => index == Number((BigInt(this.shard) >> BigInt(22)) % BigInt(this.shards.length)));
            return this.shards;
        },
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
        updateShard(event) {
            this.shard = event.target.value;
            console.log(Number((BigInt(this.shard) >> BigInt(22)) % BigInt(this.shards.length)));
        },
    },
};
</script>
