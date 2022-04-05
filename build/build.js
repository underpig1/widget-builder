module.exports = { build_local, build_dist, build_start }

function build_local(filepath) {
  const path = require("path")
  build(filepath, "", dist = true)
}

function build_dist(filepath) {
  const path = require("path")
  build(filepath, path.join(path.dirname(filepath), "dist"), dist = true)
}

function build_start(filepath) {
  const path = require("path")
  build(filepath, filepath, dist = true)
}

function build(filepath, target = "", dist = false) {
  const fs = require("fs-extra")
  const path = require("path")
  const pkgpath = path.join(filepath, "config.json")
  const configpath = path.join(__dirname, "..\\src\\config.json")
  var pkg = null
  var autopkg = false
  try {
    pkg = require(pkgpath)
    autopkg = false
    build_target(filepath, target, pkg)
  }
  catch (err) {
    fs.copyFile(configpath, pkgpath, error)
    pkg = require(configpath)
    autopkg = true
    build_target(filepath, target, pkg)
  }

  function build_target(filepath, target, pkg) {
    const config =  require(configpath)

    if (target == "") var target = process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\widgets\\" + pkg.name

    setTimeout(() => {
      if (autopkg) {
        pkg.name = path.basename(filepath)
        name = pkg.name
        fs.writeFile(pkgpath, JSON.stringify(pkg, null, 2), error)
      }
    }, 10)

    // if (!pkg.index.startsWith("C:")) {
    //   pkg.index = path.join(filepath, pkg.index)
    //   fs.writeFile(pkgpath, JSON.stringify(pkg, null, 2), error)
    // }

    for (var prop of ["x", "y", "width", "height", "transparent", "interact", "draggable"]) {
      if (!pkg.properties.hasOwnProperty(prop)) pkg.properties[prop] = config.properties[prop]
    }
    setTimeout(() => {
      fs.writeFile(pkgpath, JSON.stringify(pkg, null, 2), error)
    }, 10)

    name = pkg.name

    fs.exists(target, (exists) => {
      if (!exists) {
        try {
          fs.mkdir(target, error)
        }
        catch {}
        copy(filepath, target, pkg)
      }
      else {
        copy(filepath, target, pkg)
      }
    })

    function copy(filepath, target, pkg) {
      fs.copy(filepath, target).then(() => { cont(filepath, target, pkg) }).catch(() => {cont(filepath, target, pkg)})
      function cont(filepath, target, pkg) {
        if (dist) fs.copyFile(path.join(__dirname, "..\\src\\install.js"), path.join(target, "install.js"), error)
        fs.copyFile(pkgpath, path.join(target, "config.json"), error)
        fs.copyFile(path.join(__dirname, "..\\src\\main.js"), path.join(target, "main.js"), error)
        fs.copyFile(path.join(__dirname,"..\\src\\package.json"), path.join(target, "package.json"), error)
        fs.copyFile(path.join(__dirname,"..\\src\\preload.js"), path.join(target, "preload.js"), error)
        fs.copyFile(path.join(__dirname,"..\\src\\execute.bat"), path.join(target, "execute.bat"), error)
      }
    }
  }

  function error(err) {
    if (err) {
      console.error(err)
      return
    }
  }
}
