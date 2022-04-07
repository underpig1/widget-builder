const path = require("path")
const fs = require("fs-extra")
const pkg = require(path.join(__dirname, "config.json"))
const exec = require("child_process").exec

if (pkg.hasOwnProperty("requirements")) {
  for (var req of pkg.requirements) {
    exec.exec("npm install -g " + req, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
    })
  }
}

fs.copy(__dirname,  process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\widgets\\" + pkg.name).then(() => { console.log("Successfully installed " + pkg.name + "! Use 'widgets list' to see all enabled widgets") }).catch(err => console.error(err))
