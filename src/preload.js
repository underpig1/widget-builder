draggable = require("./config.json").properties.draggable

if (draggable) {
  document.body.style.webkitUserSelect = "none"
  document.body.style.webkitAppRegion = "drag"
}
