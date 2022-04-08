var exec = require("child_process").exec
var path = require("path")

// MediaController("summary", (summary) => {
//   var summary = JSON.parse(summary.replace(/'(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "\""))
//   console.log(summary)
// })

var progress_time = document.getElementById("progress-time")
var progress_indicator = document.getElementById("progress-indicator")
var song_title = document.getElementById("song-title")
var song_artist = document.getElementById("song-artist")
var album_cover = ".\\media\\album-cover.jpg"
var main = document.querySelector(".main")[0]

function MediaController(command, callback = null) {
  exec(`python ${path.join(__dirname, "retrieve-media-playback-info.py")} ${command}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
    if (callback != null) {
      callback(stdout)
    }
  })
}

function setValue(el, attribute, value) {
  el[attribute] = value
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

// setValue(progress_indicator, width, + "%")
// setValue(progress_indicator, width, + "%")

setInterval(() => {
  MediaController("summary", (summary) => {
    var summary = JSON.parse(summary.replace(/'(?=(?:(?:[^"]*"){2})*[^"]*$)/g, "\""))
    progress_indicator.style.width = Math.floor(parseInt(summary.position)/parseInt(summary.duration)*100).toString() + "%"
    var minutes = Math.floor(parseInt(summary.position)/60)
    var seconds = parseInt(summary.position) - minutes * 60
    seconds *= (seconds < 10 ? 10 : 1)
    seconds = seconds.toString()
    minutes = minutes.toString()
    progress_time.innerText = `${minutes}:${seconds}`
    song_title.innerText = summary.title
    song_artist.innerText = summary.artist
  })
  MediaController("thumbnail")
  main.style.backgroundImage = "url('album-cover.jpg') !important"
  setTimeout(() => {
    main.style.backgroundImage = "linear-gradient(to bottom, #00000050, #000000FF), url('media/album-cover.jpg') !important"
  }, 10)
}, 1000)
