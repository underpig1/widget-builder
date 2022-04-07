var playback = require("windows.media.playback")

progress_time = document.getElementById("progress-time")
progress_indicator = document.getElementById("progress-indicator")
song_title = document.getElementById("song-title")
song_artist = document.getElementById("song-artist")
album_cover = ".\\media\\album-cover.jpg"

function setValue(el, attribute, value) {
  el.style[attribute] = value
}

function skipBack() {}
function pausePlay() {}
function skipForward() {}

// setValue(progress_indicator, width, + "%")
// setValue(progress_indicator, width, + "%")

setInterval(() => {

}, 1000)
