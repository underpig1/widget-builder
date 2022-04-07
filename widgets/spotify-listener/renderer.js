var SpotifyWebApi = require("spotify-web-api-node")

var spotifyApi = new SpotifyWebApi({
  clientID: "34e459a11ee64d4bb64624975e9f0cdf",
  redirectUri: "http://localhost:3000/spotify/callback",
  clientSecret: "900d19e498dd4535bd884c119b4794cf"
})

const spotifyLogin = (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state']
  const authorizeURL = spotifyAuth.createAuthorizeURL(scopes)
  res.redirect(authorizeURL)
}

const spotifyCallback = async (req, res) => {
  try {
    const code = req.query.code
    const auth = await spotifyApi.authorizationCodeGrant(code)
    const spotifyApi = new SpotifyWebApi({ accessToken: auth.body.access_token })
    spotifyApi.setAccessToken(data.body["access_token"])
    res.redirect(`${process.env.LOCAL_URI}home`)
  } catch (error) {
    console.error(error)
  }
}

// progress_time = document.getElementById("progress-time")
// progress_indicator = document.getElementById("progress-indicator")
// song_title = document.getElementById("song-title")
// song_artist = document.getElementById("song-artist")
// album_cover = ".\\media\\album-cover.jpg"

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
