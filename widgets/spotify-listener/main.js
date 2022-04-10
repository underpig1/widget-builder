const {app, BrowserWindow} = require("electron")
const path = require("path")

const config = require(path.join(__dirname, "config.json"))

function init() {
  const main = new BrowserWindow({
    width: config.properties.width,
    height: config.properties.height,
    frame: false,
    transparent: config.properties.transparent,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  main.setPosition(config.properties.x, config.properties.y)
  main.setSkipTaskbar(true)
  main.setResizable(false)
  if (!config.properties.interact) {
    const top = new BrowserWindow({parent: main, modal: true, transparent: true, frame: false, show: true, width: 0, height: 0})
    top.setSkipTaskbar(true)
  }
  main.setAlwaysOnTop(config.properties.top)
  main.once("ready-to-show", () => main.show())
  main.loadFile(config.index)
}

app.whenReady().then(() => {
  init()
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) init()
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})
