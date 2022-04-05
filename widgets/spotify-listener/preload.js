draggable = require("./config.json").properties.draggable

window.addEventListener("DOMContentLoaded", () => {
  draggable_elements = document.querySelectorAll(".draggable")
  for (var el of draggable_elements) {
    el.style.webkitAppRegion = "drag"
  }

  interactable_elements = document.querySelectorAll(".interact")
  for (var el of interactable_elements) {
    el.style.webkitAppRegion = "no-drag"
  }
})
