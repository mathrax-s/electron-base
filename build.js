const { build } = require("electron-builder")


build({
    "config": {
        "appId": "com.mathrax.electron-base",
        "productName": "electron-base",
        "files": [
            "app/**/*",
            "package.json",
            "package-lock.json"
        ],
        "win": {
            "target": "portable",
            "icon": "app/assets/icon.ico"
        }
    }
});