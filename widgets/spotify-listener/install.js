const path = require("path")
const fs = require("fs-extra")
const pkg = require(path.join(__dirname, "config.json"))

fs.copy(__dirname,  process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\widgets\\" + pkg.name).then(() => { console.log("Successfully installed " + pkg.name + "! Use 'widgets list' to see all enabled widgets") }).catch(err => console.error(err))
