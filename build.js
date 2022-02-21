const { build } = require("electron-builder")


build({
    "config": {
        "appId": "com.mathrax.kimitorobot",
        "productName": "KimiToRobot",
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