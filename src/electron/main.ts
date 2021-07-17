import { app, BrowserWindow } from "electron";

import * as multer from "multer";
import { OsuReplay } from "@brunohpaiva/osu-parser";

import * as path from "path";
import * as express from "express";
import * as history from 'connect-history-api-fallback';

const PORT = 9000;
const webApp = express();
const upload = multer();

function createWindow() {

  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
    darkTheme: true,
  });
  webApp.listen(PORT, () => {
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(`http://localhost:${PORT}/`);
  
    mainWindow.webContents.openDevTools();
  })
}

app.on("ready", () => {
  webApp.post("/readReplay", upload.single('replay'), (req, res) => {
    const replay = OsuReplay.parse(req.file.buffer);
    
    delete replay.windowsTicks;
    delete replay.onlineScoreId;
    res.send(replay);
  })

  const staticMiddleware = express.static("dist/client");
  webApp.use(staticMiddleware);
  webApp.use(history());
  webApp.use(staticMiddleware);
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});