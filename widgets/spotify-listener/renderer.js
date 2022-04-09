var exec = require("child_process").exec
var path = require("path")
const fs = require("fs")

// MediaController("result", (result) => {
//   var result = JSON.parse(result.replace(/'(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "\""))
//   console.log(result)
// })

var progress_time = document.getElementById("progress-time")
var progress_indicator = document.getElementById("progress-indicator")
var song_title = document.getElementById("song-title")
var song_artist = document.getElementById("song-artist")
var album_cover = ".\\media\\album-cover.jpg"
var main = document.getElementById("main")

main.style.backgroundImage = "linear-gradient(to bottom, #00000050, #000000FF), url(\"media/album-cover.jpg\") !important"

exec(`\"${path.join(__dirname, "exec-python.vbs")}\"`, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
    return
  }
})

function MediaController(command, callback = null) {
  exec(`python \"${path.join(__dirname, "retrieve-media-playback-info.py")}\" ${command}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
    if (callback != null) {
      callback(stdout)
    }
  })
}

function skipBack() {
  MediaController("skip-back")
}
function pausePlay() {
  MediaController("toggle")
}
function skipForward() {
  MediaController("skip-forward")
}

var previous_timer = [0, 0]

setInterval(() => {
  var result = JSON.parse(fs.readFileSync(path.join(__dirname, "result.json")))
  progress_indicator.style.width = Math.floor(parseInt(result.timeline_position)/parseInt(result.timeline_duration) * 100).toString() + "%"
  var minutes = Math.floor(parseInt(result.timeline_position) / 60)
  var seconds = (parseInt(result.timeline_position)) - minutes * 60
  if (previous_timer == [seconds, minutes]) {
    seconds = previous_timer[0]
    minutes = previous_timer[1]
    seconds == 59 ? (minutes += 1, seconds = 0) : seconds += 1
  }
  previous_timer = [seconds, minutes]
  seconds *= (seconds < 10 ? 10 : 1)
  seconds = seconds.toString()
  minutes = minutes.toString()
  progress_time.innerText = `${minutes}:${seconds}`
  song_title.innerText = result.title
  song_artist.innerText = result.artist
  main.style.backgroundImage = "url('album-cover.jpg') !important"
  setTimeout(() => {
    main.style.backgroundImage = "linear-gradient(to bottom, #00000050, #000000FF), url('media/album-cover.jpg') !important"
  }, 10)
  if (song_title.innerText.length >= 16) {
    song_title.style.animation = "loop-scroll-l 10s linear infinite"
  }
  else {
    song_title.style.animation = "none"
  }
  if (song_artist.innerText.length >= 16) {
    song_artist.style.animation = "loop-scroll-r 10s linear infinite"
  }
  else {
    song_artist.style.animation = "none"
  }
}, 1000)
