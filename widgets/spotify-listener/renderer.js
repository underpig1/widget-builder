var playback = require("windows.media.playback")

progress_time = document.getElementById("progress-time")
progress_indicator = document.getElementById("progress-indicator")
song_title = document.getElementById("song-title")
song_artist = document.getElementById("song-artist")
album_cover = ".\\media\\album-cover.jpg"

spotifyApi.getMyCurrentPlaybackState()
  .then(function(data) {
    if (data.body && data.body.is_playing) {
      console.log(data.body)
    } else {
      console.log("User is not playing anything, or doing so in private.")
    }
  }, function(err) {
    console.log('Something went wrong!', err)
});

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
