<template>
    <div class="grow flex flex-col translate-y-0 transition-transform duration-x ease-in-out translate-x-0">
        <section class="flex text-left items-center m-h-25 mt-20">
            <div class="ml-10-p">
                <h1 v-if="!unknown_state" class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white flex">
                    {{ getTranslation(`rso.title.${steps_name}`) }}
                </h1>
                <p v-if="!unknown_state" class="text-xl text-gray-400 mb-4">{{ getTranslation(`rso.description.${steps_name}`) }}</p>
            </div>
        </section>
        <section class="flex items-center justify-center" v-if="unknown_state">
            <div class="items-center text-center">
                <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white flex items-center justify-center">
                    {{ getTranslation('rso.unknown_state') }}
                </h1>
            </div>
        </section>
        <section class="ml-10-p text-left w-full mb-20" v-if="!unknown_state && steps.length">
            <div v-for="(step, i) of steps" :key="step" class="flex items-center mb-8">
                <div
                    class="w-12 h-12 rounded-full dark:bg-opacity-25 flex justify-center items-center text-white dark:text-teal-400 font-medium"
                    style="flex-shrink: 0"
                    :class="
                        !step.success && step.done && !steps[i + 1].done
                            ? 'val_gradient-bg'
                            : steps.some(k => !k.success && k.done) && steps.findIndex(k => !k.success && k.done) < i
                            ? 'bg-gray-3'
                            : step.success
                            ? 'green_gradient-bg'
                            : 'hdev_gradient-bg'
                    "
                >
                    <i v-if="step.success" class="fa-solid fa-check text-white"></i>
                    <i v-else-if="(!step.success && step.done && !steps[i + 1].done) || steps.some(i => !i.success && i.done)" class="fa-solid fa-xmark text-white"></i>
                    <i v-else-if="!step.done && (steps[i - 1]?.done || !steps[i - 1])" class="fa-solid fa-circle-notch text-white fa-spin"></i>
                </div>
                <div class="flex flex-col text-left ml-8 text-white" style="max-width: -webkit-fill-available">
                    <p>{{ getTranslation(`rso.events.${step.name}`) }}</p>
                    <pre style="overflow: auto">{{ step.value ? JSON.stringify(step.value) : null }}</pre>
                </div>
            </div>
        </section>
        <section class="flex items-center justify-center" v-if="!steps.length && !unknown_state">
            <div class="items-center text-center">
                <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white flex items-center justify-center">
                    {{ getTranslation('rso.fetching_steps') }}
                </h1>
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

.hdev_gradient-bg {
    background-image: linear-gradient(310deg, #eb6a0a, #edcf27);
}

.val_gradient-bg {
    background-image: linear-gradient(310deg, #d60808, #ff6690);
}
</style>

<script>
import CustomFooter from '../../components/footer.vue';
import axios from 'axios';
import {io} from 'socket.io-client';

export default {
    name: 'RSO',
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
            steps: [],
            steps_name: null,
            unknown_state: false,
        };
    },
    async created() {
        this.i18n = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/${this.llang}`).catch(e => e)).data ?? {};
        const socket = io(process.env.VUE_APP_BASE_API_URL, {
            query: {
                rso: this.$route.query.uuid,
            },
        });
        if (!this.$route.query.uuid) this.unknown_state = true;
        socket.on('UNKNOWN_STATE', msg => {
            console.log(msg);
            this.unknown_state = true;
        });
        socket.on('INIT_PLAN', msg => {
            console.log(msg);
            this.steps = msg.steps;
            this.steps_name = msg.type;
        });
        socket.on('STEP_UPDATE', msg => {
            console.log(msg);
            this.steps.splice(
                this.steps.findIndex(i => i.step == msg.step),
                1,
                msg
            );
        });
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
