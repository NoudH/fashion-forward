module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            enableRemoteModule: true,
            builderOptions: {
                productName: 'Fashion forward',
                win: {
                    icon: './public/icon.png'
                }
            }
        }
    }
}