// Variables ========================
var fs = require("fs");

var keys = require("./keys.js");

var request = require("request");

var twitter = require("twitter");

var spotify = require("spotify");

var userInput = process.argv[2];

var nodeArgs = process.argv;
var userQuery = "";
for (var i=3; i<nodeArgs.length; i++) {
  if (i>3 && i<nodeArgs.length) {
    userQuery = userQuery + "+" + nodeArgs[i];
  } else {
    userQuery = userQuery + nodeArgs[i];
  }
}

// Functions/Arguments =========================

switch(userInput) {
    case "my-tweets":
        getTwitter();
    break;

    case "spotify-this-song":
        getSpotify();
    break;

    case "movie-this":
        getMovie();
    break;

    case "do-what-it-says":
        getDoIt();
    break;
}
// ====== TWITTER
function getTwitter() {
  var twitLogin = new twitter ({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

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
function getSpotify() {
  if (userQuery == undefined) {
    userQuery = "what's my age again";
  }

  spotify.search ({
    type: "track",
    query: userQuery
    }, function(err, data) {
      if (err) {
        console.log(err);
        return;
      } else {
          console.log("\n==SPOTIFY RESULTS==\n");
          console.log(userQuery);
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
function getMovie() {
  if (userQuery == undefined) {
    userQuery = "Mr Nobody";
  }

  var queryURL = 'http://www.omdbapi.com/?t=' + userQuery +'&y=&plot=short&tomatoes=true&r=json';

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
function getDoIt() {
  fs.readFile("random.txt", "utf8", function(err,data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);

      var dataArr = data.split(', ');

      console.log(dataArr);

      userInput = dataArr[0].trim();
      console.log(userInput);
      userQuery = dataArr[1].trim();
      console.log(userQuery);
      /*for (var i=1; i<dataArr.length; i++) {
        if (i>1 && i<dataArr.length) {
          userQuery = userQuery + "+" + dataArr[i];
        } else {
          userQuery = userQuery + dataArr[i];
        }
      }; */

      switch(userInput) {
        case "my-tweets":
            getTwitter();
        break;

        case "spotify-this-song":
            getSpotify();
        break;

        case "movie-this":
            getMovie();
        break;
      }
    }
  });
}