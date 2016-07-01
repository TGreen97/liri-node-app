// Variables ========================
var fs = require("fs");

var keys = require("./keys.js");

var request = require("request");

var twitter = require("twitter");

var spotify = require("spotify");

var userInput = process.argv[2];

// Functions/Arguments =========================
// ====== TWITTER
var twitLogin = new twitter ({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

if (userInput == "my-tweets") {
  var params = {
      screen_name: "TGreen304",
      trim_user: true,
      count: 20 };
  //console.log(params);
  twitLogin.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        for (i = 0; i < 20; i++)
          {
          console.log(tweets[i].text);
          console.log(tweets[i].created_at);
          console.log("\n================\n");
          }
      } /*else {
            console.log(error);
        };*/
  });
}

// ======== SPOTIFY
if (userInput == "spotify") {
  var trackName = process.argv[3];
  //console.log(params);
  if (trackName === undefined) {
    trackName = "what's my age again";
  }

  spotify.search ({
    type: "track",
    query: trackName
    }, function(err, data) {
      if (err) {
        console.log(err);
        return;
      } else {
          console.log("\n==SPOTIFY RESULTS==\n");
          console.log("Track Name: " + data.tracks.items[0].name);
          console.log("Artist: " + data.tracks.items[0].artists[0].name);
          console.log("Album: " + data.tracks.items[0].album.name)
          console.log("Listen: " + data.tracks.items[0].preview_url);
          console.log("\n===================\n");
      }
        /*else {
            console.log(error);
        };*/
  });
}

//movie-this

//do-what-it-says
