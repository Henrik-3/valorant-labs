const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    parallel: true,
    configureWebpack: {
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 10000,
                maxSize: 100000,
            },
        },
    },
});
