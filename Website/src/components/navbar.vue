<template>
    <header class="absolute w-full z-30 p-4">
        <div class="w-full px-4 sm:px-6">
            <div class="flex items-center justify-between h-20">
                <!-- Site branding -->
                <div class="shrink-0 mr-5">
                    <!-- Logo -->
                    <a class="block">
                        <img src="https://valorantlabs.xyz/logo.png" class="w-12 h-12" />
                    </a>
                </div>

                <!-- Desktop navigation -->
                <nav class="flex grow">
                    <!-- Desktop menu links -->
                    <ul class="flex grow flex-wrap items-center font-medium justify-center">
                        <li>
                            <router-link
                                :to="{name: 'GuildSelect'}"
                                class="text-white text-white px-5 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer"
                                target="_blank"
                                disabled
                                ><i class="fa-solid fa-gears mr-2"></i>Dashboard</router-link
                            >
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
                <div></div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'navbar',
    props: {
        image: {
            String,
        },
    },
    methods: {
        scrollto(element) {
            document.getElementById(element).scrollIntoView();
        },
    },
};
</script>
