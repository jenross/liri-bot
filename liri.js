require("dotenv").config();

//packages and files required
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const Spotify = require("node-spotify-api");
//variables to hold user input 
let command = process.argv[2];
let searchArgs = process.argv;
let search = "";
//loop to get all of the words in the title, artist, etc the user searches 
for (let i = 3; i < searchArgs.length; i++) {
  if (i > 3 && i < searchArgs.length) {
    search = search + "+" + searchArgs[i];
  } else {
    search += searchArgs[i];
  }
}

function runLiri(command, search) {

  switch(command) {
    case "movie-this":
      movieThis(search);
      break; 

    case "concert-this":
      concertThis(search);
      break;

    case "spotify-this-song":
      spotifyThis(search);
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;
  }

}

function movieThis(search) {
  let movieQueryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
  axios.get(movieQueryURL).then(
    function(response) {
      if (response.data.Response === "False") {
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
      } else {
        console.log("--------------------------------------------------------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("--------------------------------------------------------------------------------");
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
  });
}

function concertThis(search) {
  let concertQueryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
  axios.get(concertQueryURL).then(
    function(response) {
      for (let i = 0; i < 10; i++) {
        console.log("--------------------------------------------------------------------------------");
        console.log("Venue: " + response.data[i].venue.name);
        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
  });
}

function spotifyThis(search) {
  let spotify = new Spotify(keys.spotify);
  if (!search) {
    search = "The Sign";
  }
    spotify.search({type: "track", query: search}, function(error, data) {
      let results = data.tracks.items;
      if (error) {
        console.log("Sorry, there was an error.");
      }
        for (let i = 0; i < 5; i++) {
        console.log("--------------------------------------------------------------------------------");
        console.log("Artist: " + results[i].artists[0].name);
        console.log("Song: " + results[i].name);
        console.log("Preview: " + results[i].preview_url);
        console.log("Album: " + results[i].album.name);
      }
    })
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    let dataArr = data.split(',');
    // console.log(dataArr[0], dataArr[1]);
    // console.log(dataArr[0], dataArr[1].replace(/['"]+/g, ''));
    runLiri(dataArr[0], dataArr[1].replace(/['"]+/g, ''));
  });
}

runLiri(command, search);