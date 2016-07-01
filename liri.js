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
if (userInput == "spotify-this-song") {
  var nodeArgs = process.argv;
  var trackName = "";
  for (var i=3; i<nodeArgs.length; i++) {
    if (i>3 && i<nodeArgs.length) {
      trackName = trackName + "+" + nodeArgs[i];
    } else {
      trackName = trackName + nodeArgs[i];
    }
  }
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

// ======= OMDB
if (userInput == "movie-this") {
  var nodeArgs = process.argv;
  var movieName = "";
  for (var i=3; i<nodeArgs.length; i++) {
    if (i>3 && i<nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName = movieName + nodeArgs[i];
    }
  }
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var queryURL = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';

  request(queryURL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("\n==OMDB RESULTS==\n");
        console.log("Film Title: " + JSON.parse(body)["Title"]);
        console.log("Release Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country of Origin: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
        console.log("\n===================\n");
      } else {console.log(error);
        return;
      }
  });
}
// ======= Do-what-it-says
if (userInput == "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(err,data) {

    console.log(data);

    var dataArr = data.split(",");

    console.log(dataArr);
  });
}

  /*var nodeArgs = process.argv;
  var movieName = "";
  for (var i=3; i<nodeArgs.length; i++) {
    if (i>3 && i<nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName = movieName + nodeArgs[i];
    }
  }
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  } */
