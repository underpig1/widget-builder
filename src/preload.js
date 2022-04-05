draggable = require("./config.json").properties.draggable

if (draggable) {
  body = document.body
  body.innerHTML = "<div class = 'draggable'>" + body.innerHTML + "</div>"
}

draggable_elements = document.querySelectorAll(".draggable")
for (var el of draggable_elements) {
  el.style.webkitUserSelect = "none"
  el.style.webkitAppRegion = "drag"
}
not_draggable_elements = document.querySelectorAll(".not-draggable")
for (var el of not_draggable_elements) {
  el.style.webkitAppRegion = "no-drag"
}
