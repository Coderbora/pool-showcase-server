import { app, BrowserWindow } from "electron";

import * as multer from "multer";
import { OsuReplay } from "@brunohpaiva/osu-parser";

import * as path from "path";
import * as express from "express";
import * as history from 'connect-history-api-fallback';

import { Map, ShowSettings } from '../shared/types';

const PORT = 9000;
const webApp = express();
const upload = multer();

let showcasePool = [] as Map[];
let showSettings = {} as ShowSettings;

function createWindow() {

  const mainWindow = new BrowserWindow({
    height: 600,
    width: 1000,
    darkTheme: true,
  });
  webApp.listen(PORT, () => {
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(`http://localhost:${PORT}/`);
  })
}

app.on("ready", () => {
  webApp.use(express.json());

  webApp.get("/showcasePool", (req, res) => {
    res.send(showcasePool);
  });

  webApp.post("/showcasePool", (req, res) => {
    showcasePool = req.body;
    res.sendStatus(200);
  });

  webApp.get("/showSettings", (req, res) => {
    res.send(showSettings);
  });

  webApp.post("/showSettings", (req, res) => {
    showSettings = req.body;
    res.sendStatus(200);
  });

  webApp.post("/readReplay", upload.single('replay'), (req, res) => {
    const replay = OsuReplay.parse(req.file.buffer);
    
    delete replay.windowsTicks;
    delete replay.onlineScoreId;
    res.send(replay);
  });

  const staticMiddleware = express.static(path.resolve(__dirname, "../client"));
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