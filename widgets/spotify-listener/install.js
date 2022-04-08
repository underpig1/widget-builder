const path = require("path")
const fs = require("fs-extra")
const pkg = require(path.join(__dirname, "config.json"))
const exec = require("child_process").exec

var target_dir = process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\widgets\\" + pkg.name

fs.copy(__dirname,  target_dir).then(() => { console.log("Successfully installed " + pkg.name + "! Use 'widgets list' to see all enabled widgets") }).catch(err => console.error(err))

setTimeout(() => {
  if (pkg.hasOwnProperty("requirements")) {
    for (var req of pkg.requirements) {
      run_cmd("cd \"" + target_dir + "\" & npm install ")
    }
  }
  if (pkg.hasOwnProperty("install")) {
    if (Array.isArray(pkg.install)) {
      for (var cmd of pkg.install) {
        run_cmd(cmd)
      }
    }
    else {
      run_cmd(pkg.install)
    }
  }
}, 1000)

function run_cmd(cmd) {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
  })
}
