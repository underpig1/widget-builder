#!/usr/bin/env node

const path = require("path")
const build = require(path.join(__dirname, "..\\build\\build.js"))
const fs = require("fs")
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
})

require("yargs")
  .scriptName("widgets")
  .usage("$0 <command> [arguments]")
  .command("build [folder]", "Builds HTML files to desktop widget and installs", (yargs) => {
    yargs.positional("folder", {
      type: "string",
      describe: "The folder containing the content to build (includes HTML and optional config.json)"
    })
  }, function (argv) {
    argv.folder ? folder = argv.folder : folder = path.resolve(".")
    console.log("Building widget at " + folder)
    build.build_local(folder)
    console.log("widget successfully built and installed! Run 'widgets list' to see all enabled widgets")
  })
  .command("publish [folder]", "Generates a dist file that can be installed by the widgets cli", (yargs) => {
    yargs.positional("folder", {
      type: "string",
      describe: "The folder containing the content to build (includes HTML and optional config.json)"
    })
  }, function (argv) {
    argv.folder ? folder = argv.folder : folder = path.resolve(".")
    console.log("Publishing widget at " + folder)
    build.build_dist(folder)
    console.log("widget successfully built to " + path.join(path.dirname(folder), "dist"))
  })
  .command("install [folder]", "Installs widget at folder", (yargs) => {
    yargs.positional("folder", {
      type: "string",
      describe: "The folder containing the widget to install"
    })
  }, function (argv) {
    argv.folder ? folder = argv.folder : folder = path.resolve(".")
    const child_process = require("child_process")
    child_process.exec("node " + path.join(folder, "install.js"), (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
    })
    console.log("widget successfully installed at " + folder + "!")
  })
  .command("init [folder]", "Initializes widgets project", (yargs) => {
    yargs.positional("folder", {
      type: "string",
      describe: "The folder to initialize"
    })
  }, function (argv) {
    argv.folder ? folder = argv.folder : folder = path.resolve(".")
    fs.copyFile(path.join(__dirname, "..\\src\\config.json"), path.join(folder, "config.json"), (err) => { if (err) console.error(err) })
    fs.copyFile(path.join(__dirname, "..\\src\\index.html"), path.join(folder, "index.html"), (err) => { if (err) console.error(err) })
    fs.copyFile(path.join(__dirname, "..\\src\\renderer.js"), path.join(folder, "renderer.js"), (err) => { if (err) console.error(err) })
    setTimeout(() => {
      readline.question("Name of your project: ", name => {
        config = require(path.join(folder, "config.json"))
        config.name = name
        fs.writeFile(path.join(folder, "config.json"), JSON.stringify(config, null, 2), (err) => { if (err) console.error(err) })
        readline.close()
        console.log("widget successfully initialized at " + folder + "! You can now edit your project's properties at config.json")
      })
    }, 10)
  })
  .command("list", "Lists all installed widgets", (yargs) => {}, function (argv) {
    installed = get_all_installed_widgets()
    installed = installed.map((x) => x.name + (x.config.version ? " --- " + x.config.version : ""))
    installed = installed.join("\n")
    console.log(installed)
  })
  .command("uninstall <widget>", "Uninstall widget", (yargs) => {
    yargs.positional("widget", {
      type: "string",
      describe: "The widget to uninstall"
    })
  }, function (argv) {
    installed = get_all_installed_widgets()
    target = installed.filter((x) => x.name == argv.widget)[0]
    fs.rmdirSync(target.path, { recursive: true, force: true })
    console.log(target.name + " successfully uninstalled!")
  })
  .command("config <widget>", "Configure widget by name", (yargs) => {
    yargs.positional("widget", {
      type: "string",
      describe: "The widget to configure"
    })
  }, function (argv) {
    installed = get_all_installed_widgets()
    target = installed.filter((x) => x.name == argv.widget)[0]
    var exec = require("child_process").exec
    try {
      exec(`start \"\" \"${path.join(target.path, "config.json")}\"`)
      console.log("Now editing config.json of " + target.name)
    }
    catch (err) {
      console.error("Cannot open " + path.join(target.path, "config.json"))
    }
  })
  .command("start [folder]", "Starts the widget at folder", (yargs) => {
    yargs.positional("folder", {
      type: "string",
      describe: "The folder containing the content to start (includes HTML and optional config.json)"
    })
  }, function (argv) {
    argv.folder ? folder = argv.folder : folder = path.resolve(".")
    console.log("Starting widget at " + folder)
    build.build_start(folder)
    setTimeout(() => {
      var exec = require("child_process").exec
      try {
        exec(`npm start \"${folder}\"`)
        console.log("widget successfully started at " + folder)
      }
      catch (err) {
        console.error("Cannot start " + folder)
      }
    }, 20)
  })
  .help()
  .argv

function get_all_installed_widgets() {
  src = process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\widgets"
  installed = []
  get_directories = (src) => {
    return fs.readdirSync(src)
      .map((f) => f = path.join(src, f))
      .filter((f) => { return fs.statSync(f).isDirectory() })
  }
  directories = get_directories(src)
  for (f of directories) {
    try {
      var config = require(path.join(f, "config.json"))
      installed.push({
        "name": config.name,
        "path": f,
        "filename": path.basename(f),
        "config": config
      })
    }
    catch (error) {}
  }

  return installed
}
