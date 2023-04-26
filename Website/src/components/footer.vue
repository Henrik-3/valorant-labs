<template>
    <footer class="relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="py-12 py-16 border-t border-gray-200 dark:border-gray-800 -mt-px">
                <!-- Footer illustration -->

                <!-- Top area: Blocks -->
                <div class="grid grid-cols-12 gap-8 lg:gap-20 mb-8 mb-12">
                    <!-- 1st block -->
                    <div class="col-span-2 lg:col-span-3">
                        <!-- Logo -->
                        <img src="https://valorantlabs.xyz/logo.png" class="w-12" />
                    </div>
                </div>

                <!-- Bottom area -->
                <div class="flex items-center justify-between">
                    <!-- Social links -->
                    <ul class="flex mb-4 order-2 mb-0">
                        <li>
                            <a
                                class="flex justify-center items-center text-white bg-gray-3 rounded-full mr-2"
                                href="https://twitter.com/valorant_labs"
                                aria-label="Twitter"
                            >
                                <div class="flex items-center justify-center w-8 h-8 fill-current">
                                    <i class="tooltip fab fa-twitter cl-gradient"></i>
                                </div>
                            </a>
                        </li>
                        <li class="ml-2">
                            <a
                                class="flex justify-center items-center text-white bg-gray-3 rounded-full"
                                href="https://github.com/Henrik-3/valorant-labs"
                                aria-label="Github"
                            >
                                <div class="flex items-center justify-center w-8 h-8 fill-current">
                                    <i class="tooltip fab fa-github cl-gradient"></i>
                                </div>
                            </a>
                        </li>
                    </ul>

                    <!-- Middle links -->
                    <div class="text-sm order-1 text-gray-700 mb-2 mb-0">
                        <router-link :to="{name: 'LegalNotice'}" class="text-white hover:underline transition duration-150 ease-in-out">Legal Notice</router-link> ·
                        <router-link :to="{name: 'Tos'}" class="text-white hover:underline transition duration-150 ease-in-out">Terms</router-link> ·
                        <router-link :to="{name: 'Privacy'}" class="text-white hover:underline transition duration-150 ease-in-out">Privacy</router-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'custom_footer',
    props: {},
};
</script>
