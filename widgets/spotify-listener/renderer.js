var child_process = require("child_process")
var path = require("path")
const fs = require("fs")

// MediaController("result", (result) => {
//   var result = JSON.parse(result.replace(/'(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "\""))
//   console.log(result)
// })

child_process.exec(`python \"${path.join(__dirname, "retrieve-media-playback-info.py")}\" loop`, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
    return
  }
})

var progress_time = document.getElementById("progress-time")
var progress_indicator = document.getElementById("progress-indicator")
var song_title = document.getElementById("song-title")
var song_artist = document.getElementById("song-artist")
var pause_play = document.getElementById("pause-play")
var album_cover = ".\\media\\album-cover.jpg"
var pause = `url("media/pause.svg")`
var play = `url("media/play.svg")`
var main = document.getElementById("main")
var backup = document.getElementById("backup")
var paused = true
var closed = true

MediaController("pause")

function MediaController(command, callback = null) {
  child_process.exec(`python \"${path.join(__dirname, "retrieve-media-playback-info.py")}\" ${command}`, (err, stdout, stderr) => {
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
  paused = false
}
function pausePlay() {
  if (!closed) {
    if (paused) {
      MediaController("play")
      paused = false
    }
    else {
      MediaController("pause")
      paused = true
    }
  }
}
function skipForward() {
  MediaController("skip-forward")
  paused = false
}

var previous_timer = [0, 0]
var previous_result = [0, 0]

setInterval(() => {
  try {
    var result = JSON.parse(fs.readFileSync(path.join(__dirname, "result.json")))
  }
  catch {
    var result = {"playing": 0}
  }
  if (result.playing == 1) {
    var closed = false
  }
  else {
    var closed = true
  }
  progress_indicator.style.width = Math.floor(parseInt(result.timeline_position)/parseInt(result.timeline_duration) * 100).toString() + "%"
  if (result.timeline_position != "") {
    var minutes = Math.floor(parseInt(result.timeline_position) / 60)
    var seconds = Math.floor(parseInt(result.timeline_position) - minutes * 60)
    if (previous_result.toString() == [seconds, minutes].toString() && !paused && !closed) {
      seconds = previous_timer[0]
      minutes = previous_timer[1]
      seconds == 59 ? (minutes += 1, seconds = 0) : seconds += 1
      song_title.innerText = `past: ${previous_timer[0]} now: ${seconds}`
    }
    else {
      previous_result = [seconds, minutes]
    }
    previous_timer = [seconds, minutes]
    seconds = seconds.toString()
    parseInt(seconds) < 10 ? seconds = "0" + seconds : null
    minutes = minutes.toString()
  }
  else {
    seconds = "00"
    minutes = "0"
  }
  progress_time.innerText = `${minutes}:${seconds}`
  song_title.innerText = result.title
  song_artist.innerText = result.artist
  main.style.background = "url(\"media/album-cover.jpg\")"
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
  if (paused) {
    pause_play.style.backgroundImage = play
    pause_play.childNodes[0].childNodes[0].style.backgroundImage = play
  }
  else {
    pause_play.style.backgroundImage = pause
    pause_play.childNodes[0].childNodes[0].style.backgroundImage = pause
  }
}, 1000)

setTimeout(() => {
  setInterval(() => {
    main.style.background = "url('media/album-cover.jpg?v=" + new Date().getTime() + "')"
  }, 2000)
}, 1000)

setInterval(() => {
  backup.style.background = "url('media/album-cover.jpg?v=" + new Date().getTime() + "')"
}, 2000)
