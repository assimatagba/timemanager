module.exports = {
    // options...
    devServer: {
        disableHostCheck: true,
        public: process.env.VUE_APP_VUE_HOST+':8080',
        https: false,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 1000,
        },
    },

    publicPath: '',

    pluginOptions: {
      cordovaPath: 'src-cordova'
    }
}
