"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "#ffffff",
        webPreferences: {
            nodeIntegration: true,
        },
    });
    // Load the exported Expo web build (you can change "web-build" if needed)
    var indexPath = path.join(__dirname, "web-build", "index.html");
    win.loadURL(url.format({
        pathname: indexPath,
        protocol: "file:",
        slashes: true,
    }));
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
