module.exports = {
    // ...other vue-cli plugin options...
    devServer: {
        port: 8200
    },
    pwa: {
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        }
    }
}