draggable = require("./config.json").properties.draggable

window.addEventListener("DOMContentLoaded", () => {
  if (draggable) {
    body = document.body
    body.innerHTML = "<div style = 'position: absolute; width: 100%; height: 100%; -webkit-app-region: drag; z-index: 0; background: none !important;'>" + body.innerHTML + "</div>"
  }

  draggable_elements = document.querySelectorAll(".draggable")
  for (var el of draggable_elements) {
    el.style.webkitAppRegion = "drag"
  }
})
