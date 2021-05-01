module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                "appId": "ga.inxane.launcher",
                "productName": "Inxane Launcher",
                "copyright": "Copyright © 2021 Inxane Team",
                "mac": {
                    "icon": "./public/icons/macos.icns",    
                    "category": "public.app-category.utilities"
                },
                "win": {
                    "icon": "./public/icons/android-chrome-512x512.png"
                },
                "linux": {
                    "icon": "./public/icons/android-chrome-512x512.png"
                },
                snap: {
                    publish: []
                },
                publish: [
                    {
                      provider: "github",
                      owner: "Inxane-team",
                      repo: "Launcher",
                      releaseType: 'draft'
                    }
                ]
        
            },
            externals:['node-pty']
        }
    }
}