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
    <div class="dark font-inter antialiased bg-white text-white bg-gray-900 dark:text-gray-100 tracking-tight">
        <div class="flex flex-col min-h-screen overflow-hidden">
            <main class="grow">
                <section class="background flex items-center justify-center">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6">
                        <div>
                            <div class="md:grid md:grid-cols-12 md:gap-12 lg:gap-20 items-center">
                                <div class="md:col-span-7 lg:col-span-7 mb-8 md:mb-0 text-center md:text-left">
                                    <h1 class="h1 lg:text-5xl mb-4 font-red-hat-display font-extrabold">VALORANT DE - PROJECT V</h1>
                                    <p class="text-xl text-gray-600 dark:text-gray-400 aos-init aos-animate" data-aos="fade-down" data-aos-delay="150">
                                        Der größte und aktivste, deutschsprachige VALORANT Discord
                                    </p>
                                    <a class="btn valorant-gradient text-white bg-teal-500 hover:bg-teal-400 shrink-0" href="https://discord.gg/valode"
                                        >Jetzt beitreten</a
                                    >
                                </div>

                                <!-- Mobile mockup -->
                                <div class="md:col-span-5 lg:col-span-5 text-center md:text-right hide-mobile">
                                    <div class="inline-flex relative justify-center items-center">
                                        <!--<img src="../assets/images/valode_red_interlacedV2.png" />-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="tournaments" class="py-12">
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 class="h2 font-red-hat-display mb-4">Unsere Turniere</h2>
                        <p class="text-xl text-gray-600 dark:text-gray-400">Bock auf Turniere? Schau mal bei PROJECT V vorbei, der VRC aus der DACH Region</p>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6">
                        <div class="grid gap-4 sm:gap-6 sm:grid-cols-2" data-aos-id-relposts="">
                            <!-- 1st article -->
                            <article
                                v-for="tourney of tournaments"
                                :key="tourney"
                                class="relative group p-6 text-white aos-init aos-animate h-128"
                                data-aos="fade-down"
                                data-aos-anchor="[data-aos-id-relposts]"
                            >
                                <figure>
                                    <img
                                        class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-25 transition duration-700 ease-out"
                                        :src="tourney.files[0]?.file ?? 'https://projectvgg-tes-apiv3.s3.eu-central-1.amazonaws.com/News_Background.jpg'"
                                        width="372"
                                        height="182"
                                        alt="Related post 01"
                                    />
                                </figure>
                                <div class="relative flex flex-col h-full">
                                    <header>
                                        <a class="hover:underline" :href="`https://projectv.gg/tournaments/${tourney.slug}`">
                                            <h3 class="text-lg font-red-hat-display font-bold tracking-tight mb-2">
                                                {{ tourney.name.de }}
                                            </h3>
                                        </a>
                                        <div class="text-sm opacity-80">{{ formatDate(tourney.start) }}</div>
                                    </header>
                                    <main class="grow flex items-center justify-center">
                                        <a
                                            class="btn text-white bg-teal-500 hover:bg-teal-400 shrink-0"
                                            :class="tourney.series.some(i => i.slug.includes('queens')) ? 'prv-queens' : 'prv-gradient'"
                                            :href="`https://projectv.gg/tournaments/${tourney.slug}`"
                                            >Jetzt mitspielen</a
                                        >
                                    </main>
                                    <footer>
                                        <!-- Author meta -->
                                        <div class="flex items-center text-sm mt-5">
                                            <div>
                                                <span class="opacity-75">Teilnehmer </span>
                                                <a class="font-medium hover:underline">{{ tourney.participants_count }} / {{ tourney.anticipated_size }}</a>
                                            </div>
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
                <section id="discord" class="bg-gray-800 py-12">
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 class="h2 font-red-hat-display mb-4">Unserer Discord in Zahlen</h2>
                        <p class="text-xl text-gray-600 dark:text-gray-400">Wir stellen uns vor</p>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6">
                        <div class="pb-12 md:pb-20">
                            <div class="grid grid-cols-2 gap-4 lg:gap-6 md:grid-cols-4 text-center" data-aos-id-stats="">
                                <!-- 1st item -->
                                <div
                                    class="bg-white dark:bg-gray-900 py-8 px-1 shadow-2xl aos-init aos-animate"
                                    data-aos="fade-down"
                                    data-aos-anchor="[data-aos-id-stats]"
                                >
                                    <div class="font-red-hat-display text-3xl font-extrabold tracking-tighter mb-1">{{ guild.memberCount ?? 0 }}</div>
                                    <div class="text-gray-600 dark:text-gray-400">Mitglieder</div>
                                </div>
                                <!-- 2nd item -->
                                <div
                                    class="bg-white dark:bg-gray-900 py-8 px-1 shadow-2xl aos-init aos-animate"
                                    data-aos="fade-down"
                                    data-aos-anchor="[data-aos-id-stats]"
                                    data-aos-delay="100"
                                >
                                    <div class="font-red-hat-display text-3xl font-extrabold tracking-tighter mb-1">{{ guild.voice ?? 0 }}</div>
                                    <div class="text-gray-600 dark:text-gray-400">Mitglieder aktuell im Voice</div>
                                </div>
                                <!-- 3rd item -->
                                <div
                                    class="bg-white dark:bg-gray-900 py-8 px-1 shadow-2xl aos-init aos-animate"
                                    data-aos="fade-down"
                                    data-aos-anchor="[data-aos-id-stats]"
                                    data-aos-delay="200"
                                >
                                    <div class="font-red-hat-display text-3xl font-extrabold tracking-tighter mb-1">{{ guild.tickets ?? 0 }}</div>
                                    <div class="text-gray-600 dark:text-gray-400">Tickets haben wir bearbeitet</div>
                                </div>
                                <!-- 4th item -->
                                <div
                                    class="bg-white dark:bg-gray-900 py-8 px-1 shadow-2xl aos-init aos-animate"
                                    data-aos="fade-down"
                                    data-aos-anchor="[data-aos-id-stats]"
                                    data-aos-delay="300"
                                >
                                    <div class="font-red-hat-display text-3xl font-extrabold tracking-tighter mb-1">{{ guild.premiumSubscriptionCount ?? 0 }}</div>
                                    <div class="text-gray-600 dark:text-gray-400">Mitglieder boosten unseren Server</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="projectv" class="prv-gradient-section py-12">
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 class="h2 font-red-hat-display mb-4">PROJECT V</h2>
                    </div>
                    <div class="py-12 max-w-3xl mx-auto text-center md:pb-16">
                        <h4 class="h4 font-red-hat-display mb-4">Was ist PROJECT V?</h4>
                        <p class="text-xl font-medium text-white mb-8">
                            PROJECT V ist eine Möglichkeit für Spieler, sich mit anderen Teams auf jedem Skill-Level zu messen und nach dem Gewinnen von zahlreichen
                            Matches zu den besten Spielern aus Deutschland, Österreich und der Schweiz zu gehören. Schreibt eure eigene Geschichte und werdet noch heute
                            Teil von PROJECT V.
                        </p>
                        <a class="btn text-white bg-teal-500 hover:bg-teal-400 shrink-0" :class="'prv-gradient'" href="https://projectv.gg">Zur PROJECT V Website</a>
                    </div>
                </section>
                <section id="projectvqueens" class="prv-queens-section py-12">
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 class="h2 font-red-hat-display mb-4">PROJECT QUEENS</h2>
                    </div>
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h4 class="h4 font-red-hat-display mb-4">Was ist PROJECT QUEENS?</h4>
                        <p class="text-xl font-medium text-white mb-8">
                            Aufgrund der immer noch mangelnden Akzeptanz von weiblichen / nicht binären Spieler/innen in der Gaming Szene möchten wir mit PROJECT QUEENS
                            der VALORANT Community die Chance geben sich zu beweißen. PROJECT Queens läuft während PROJECT V als seperate Liga und endet zusammen mit der
                            normalen PROJECT V Liga in einem Split Finale. Bei diesem wird um den Aufstieg in die nächste Liga gespielt.
                        </p>
                        <a class="btn text-white bg-teal-500 hover:bg-teal-400 shrink-0" :class="'prv-queens'" href="https://projectv.gg">Zur PROJECT QUEENS Website</a>
                    </div>
                </section>
                <section id="partner" class="py-12">
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 class="h2 font-red-hat-display mb-4">Unsere Partner</h2>
                        <p class="text-xl text-gray-600 dark:text-gray-400">
                            Du bist auch an anderen Spielen wie Rocket League interssiert? Dann schau doch gerne bei unseren Partnern vorbei.
                        </p>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-5 lg:py-7 aos-init aos-animate" v-for="partner of partners" :key="partner">
                            <div class="flex flex-col items-center">
                                <img class="rounded-full mb-8" :src="partner.image" width="256" height="256" />
                                <h3 class="text-white font text-3xl font-bold">{{ partner.name }}</h3>
                                <p class="text-l text-gray-600 dark:text-gray-400 text-center">{{ partner.desc }}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="team" class="bg-gray-800 py-12">
                    <div class="py-12 max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h2 class="h2 font-red-hat-display mb-4">Unser Team</h2>
                        <p class="text-xl text-gray-600 dark:text-gray-400">
                            Unser Team steht euch jederzeit mit Rat und Tat zur Seite, hier könnt ihr sie ein wenig kennenlernen.
                        </p>
                    </div>
                    <div class="grid grid-cols-3 gap-12 md:grid-cols-3 text-center">
                        <div class="" v-for="member of team" :key="member">
                            <div class="flex flex-col items-center">
                                <img
                                    class="rounded-full mb-2"
                                    :style="'width: 175px; height: 175px; object-fit: cover;'"
                                    :src="
                                        member.avatar
                                            ? 'https://dash.gforg.net/cdn/avatars/' + member.id
                                            : 'https://cdn.discordapp.com/attachments/1021058251346944160/1021058301678600212/Untitled_2.png'
                                    "
                                    width="256"
                                    height="256"
                                />
                                <h3 class="text-white font text-3xl font-bold text-center" :class="gradient[member.role]">{{ member.name }}</h3>
                                <p class="text-l text-gray-600 dark:text-gray-400 text-center">{{ member.role }}</p>
                                <div class="flex flex-wrap justify-center">
                                    <a v-if="member.platforms.twitter" :href="member.platforms.twitter" style="font-size: 30px; margin-right: 5px">
                                        <i class="tooltip fab fa-twitter" :class="gradient[member.role]"></i>
                                    </a>
                                    <a v-if="member.platforms.tiktok" :href="member.platforms.tiktok" style="font-size: 30px; margin-right: 5px">
                                        <i class="tooltip fab fa-tiktok" :class="gradient[member.role]"></i>
                                    </a>
                                    <a v-if="member.platforms.insta" :href="member.platforms.insta" style="font-size: 30px; margin-right: 5px">
                                        <i class="tooltip fab fa-instagram" :class="gradient[member.role]"></i>
                                    </a>
                                    <a v-if="member.platforms.youtube" :href="member.platforms.youtube" style="font-size: 30px; margin-right: 5px">
                                        <i class="tooltip fab fa-youtube" :class="gradient[member.role]"></i>
                                    </a>
                                    <a v-if="member.platforms.twitch" :href="member.platforms.twitch" style="font-size: 30px; margin-right: 5px">
                                        <i class="tooltip fab fa-twitch" :class="gradient[member.role]"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer class="relative">
                <div class="max-w-6xl mx-auto px-4 sm:px-6">
                    <div class="py-12 md:py-16 border-t border-gray-200 dark:border-gray-800 -mt-px">
                        <!-- Footer illustration -->
                        <div class="pointer-events-none -z-1" aria-hidden="true">
                            <svg
                                class="absolute bottom-0 left-0 transform -translate-x-1/2 ml-24 dark:opacity-40"
                                width="800"
                                height="264"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="400" cy="400" r="400" fill="url(#footerglow_paint0_radial)" fill-opacity=".4"></circle>
                                <defs>
                                    <radialGradient
                                        id="footerglow_paint0_radial"
                                        cx="0"
                                        cy="0"
                                        r="1"
                                        gradientUnits="userSpaceOnUse"
                                        gradientTransform="rotate(90 0 400) scale(315.089)"
                                    >
                                        <stop stop-color="#3ABAB4"></stop>
                                        <stop offset="1" stop-color="#3ABAB4" stop-opacity=".01"></stop>
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>

                        <!-- Top area: Blocks -->
                        <div class="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
                            <!-- 1st block -->
                            <div class="md:col-span-2 lg:col-span-3">
                                <!-- Logo -->
                                <img :src="guild?.iconURL" class="w-12 h-12" />
                            </div>
                        </div>

                        <!-- Bottom area -->
                        <div class="md:flex md:items-center md:justify-between">
                            <!-- Social links -->
                            <ul class="flex mb-4 md:order-2 md:ml-4 md:mb-0">
                                <li>
                                    <a
                                        class="flex justify-center items-center text-white bg-teal-500 dark:text-teal-500 dark:bg-gray-800 hover:underline hover:bg-teal-600 rounded-full transition duration-150 ease-in-out"
                                        href="https://twitter.com/PlayValoDE"
                                        aria-label="Twitter"
                                    >
                                        <div class="flex items-center justify-center w-8 h-8 fill-current">
                                            <i class="tooltip fab fa-twitter cl-gradient"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="ml-4">
                                    <a
                                        class="flex justify-center items-center text-white bg-teal-500 dark:text-teal-500 dark:bg-gray-800 hover:underline hover:bg-teal-600 rounded-full transition duration-150 ease-in-out"
                                        href="https://github.com/VALO-DE"
                                        aria-label="Github"
                                    >
                                        <div class="flex items-center justify-center w-8 h-8 fill-current">
                                            <i class="tooltip fab fa-github cl-gradient"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="ml-4">
                                    <a
                                        class="flex justify-center items-center text-white bg-teal-500 dark:text-teal-500 dark:bg-gray-800 hover:underline hover:bg-teal-600 rounded-full transition duration-150 ease-in-out"
                                        href="https://www.tiktok.com/@playvalode"
                                        aria-label="TiKkok"
                                    >
                                        <div class="flex items-center justify-center w-8 h-8 fill-current">
                                            <i class="tooltip fab fa-tiktok cl-gradient"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="ml-4">
                                    <a
                                        class="flex justify-center items-center text-white bg-teal-500 dark:text-teal-500 dark:bg-gray-800 hover:underline hover:bg-teal-600 rounded-full transition duration-150 ease-in-out"
                                        href="https://www.instagram.com/playvalode/"
                                        aria-label="Instagram"
                                    >
                                        <div class="flex items-center justify-center w-8 h-8 fill-current">
                                            <i class="tooltip fab fa-instagram cl-gradient"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="ml-4">
                                    <a
                                        class="flex justify-center items-center text-white bg-teal-500 dark:text-teal-500 dark:bg-gray-800 hover:underline hover:bg-teal-600 rounded-full transition duration-150 ease-in-out"
                                        href="https://www.twitch.tv/playvalode"
                                        aria-label="Twitch"
                                    >
                                        <div class="flex items-center justify-center w-8 h-8 fill-current">
                                            <i class="tooltip fab fa-twitch cl-gradient"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>

                            <!-- Middle links -->
                            <div class="text-sm md:order-1 text-gray-700 mb-2 md:mb-0">
                                <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" href="/tos">Terms</a> ·
                                <a class="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" href="/privacy">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
dayjs.locale('de');
dayjs.extend(localizedFormat);

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            guild: {},
            tournaments: [],
            partners: [],
            team: [],
            color: {
                Communityleitung: '#ff1100',
                Moderator: '#0065fd',
                Supporter: '#3ca1ff',
            },
            gradient: {
                Communityleitung: 'cl-gradient',
                Moderator: 'mod-gradient',
                Supporter: 'sup-gradient',
            },
        };
    },
    async created() {
        const tournaments = await (
            await fetch(
                'https://api.projectv.gg/api/v1/frontend/tournaments/xlist?is_main=False&ordering=start&visibility=PUBLISHED&mixed=true&page=1&page_size=16&filters=%7B%7D'
            )
        ).json();
        const member_data = await (await fetch('https://valode.community/api/v1/public/valode')).json();
        this.guild = member_data.guild;
        this.guild.voice = member_data.voice;
        this.guild.tickets = member_data.tickets;
        this.partners = member_data.partner;
        this.team = member_data.team.sort((a, b) => {
            if (a.role < b.role) {
                return -1;
            }
            if (a.role > b.role) {
                return 1;
            }
            return 0;
        });
        this.tournaments = tournaments.data;
        this.tournaments.length = 4;

        console.log(this.tournaments);
    },
    methods: {
        formatDate(date) {
            return dayjs(date).format('LLL');
        },
        getMemberCount() {
            return this.members;
        },
        mobilenavbar() {
            const list = document.querySelector('.list');
            const navtoggle = document.querySelector('.mobile-nav-toggle');

            const visibility = list.getAttribute('data-visible');

            if (visibility === 'false') {
                list.setAttribute('data-visible', true);
                navtoggle.setAttribute('aria-expanded', true);
            } else if (visibility === 'true') {
                list.setAttribute('data-visible', false);
                navtoggle.setAttribute('aria-expanded', false);
            }
        },
        countUp(selector, min, max, duration) {
            var inter = setInterval(function () {
                document.querySelector(selector).innerHTML = ++min;
                if (min >= max) {
                    clearInterval(inter);
                }
            }, duration);
        },
        countDown(selector, min, max, duration) {
            var inter = setInterval(function () {
                document.querySelector(selector).innerHTML = --max;
                if (min >= max) {
                    clearInterval(inter);
                }
            }, duration);
        },
        aud_play_pause() {
            var myAudio = document.getElementById('myAudio');
            myAudio.volume = 0.2;
            if (myAudio.paused) {
                myAudio.play();
            } else {
                myAudio.pause();
            }
        },
        openNav() {
            document.getElementById('mySidenav').style.width = '250px';
            document.getElementById('main').style.marginLeft = '250px';
        },
        closeNav() {
            document.getElementById('mySidenav').style.width = '0';
            document.getElementById('main').style.marginLeft = '0';
        },
    },
};
</script>
