<template>
    <div class="grow flex flex-col translate-y-0 transition-transform duration-x ease-in-out translate-x-0">
        <section class="flex flex-col text-left mt-20-screen ml-20" style="margin-left: 5%">
            <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold text-white flex val_gradient">Legal Notice</h1>
            <p class="text-xl text-white mb-12">This Legal Notice complies with the German laws under § 5 TMG and § 55 RStV.</p>
            <p class="text-l text-white mb-4">{{ personal_data.name }}</p>
            <p class="text-l text-white mb-4">{{ personal_data.address }}</p>
            <p class="text-l text-white mb-4">{{ personal_data.address_2 }}</p>
            <p class="text-l text-white mb-4">{{ personal_data.email }}</p>
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
    name: 'Tos',
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
            personal_data: {
                name: null,
                address: null,
                address_2: null,
                email: null,
            },
        };
    },
    async created() {
        this.i18n = (await axios.get(`${process.env.VUE_APP_BASE_API_URL}/v1/public/i18n/${this.llang}`).catch(e => e)).data ?? {};
        this.personal_data.name = process.env.VUE_APP_IMPRINT_NAME;
        this.personal_data.address = process.env.VUE_APP_IMPRINT_ADDRESS;
        this.personal_data.address_2 = process.env.VUE_APP_IMPRINT_ADDRESS_2;
        this.personal_data.email = process.env.VUE_APP_IMPRINT_EMAIL;
    },
    computed: {},
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
