draggable = require("./config.json").properties.draggable

window.addEventListener("DOMContentLoaded", () => {
  if (draggable) {
    var top_bar = document.createElement("div")
    top_bar.style.position = "absolute"
    top_bar.style.width = "100%"
    top_bar.style.height = "32px"
    top_bar.style.top = top_bar.style.left = 0
    top_bar.style.webkitAppRegion = "drag"
    top_bar.style.zIndex = "-1"
    document.body.appendChild(top_bar)
  }
  draggable_elements = document.querySelectorAll(".draggable")
  for (var el of draggable_elements) {
    el.style.webkitAppRegion = "drag"
  }

  interactable_elements = document.querySelectorAll(".interact")
  for (var el of interactable_elements) {
    el.style.webkitAppRegion = "no-drag"
  }
})
