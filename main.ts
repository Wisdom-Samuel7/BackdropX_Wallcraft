import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#ffffff",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the exported Expo web build (you can change "web-build" if needed)
  const indexPath = path.join(__dirname, "web-build", "index.html");

  win.loadURL(
    url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true,
    })
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
