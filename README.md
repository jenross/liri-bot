# Liri

## About 

Liri is a command-line application that provides information about songs, concerts, and movies based on specific commands and user search input. 

## Technologies Used 

* Git 
* GitHub
* JavaScript
* Node.js
* Node packages: 
    * Node-Spotify-API
    * Moment 
    * DotEnv
    * Axios 
* APIs: 
    * Bands in Town
    * OMDB


## How to Use It

1. Open up your terminal/bash window and navigate to the folder/directory for `liri-bot` where the file `liri.js` is stored. 

<img src="images/liri-bot-1.png" alt="Terminal window showing liri-bot directory" style="width:300px;height:450px;">

2. Type the command below to see information pulled from the OMDB API about a specific movie. 

```node liri movie-this <name of movie>```

<img src="images/liri-bot-2.png" alt="Terminal window showing movie info for 'Eternal Sunshine of the Spotless Mind'">

3. Type the command below to see the top 10 upcoming concert locations and dates for a specific artist.

```node liri concert-this <name of band/artist>```

<img src="images/liri-bot-3.png" alt="Terminal window showing upcoming concert info for 'Brandi Carlile'">

4. Type the command below to see the top 5 songs on Spotify associated with your search. 

```node liri spotify-this-song <name of song>```

<img src="images/liri-bot-4.png" alt="Terminal window showing Spotify songs associated with 'Say My Name'">

5. Type the command below and the program will read the `random.txt` file and run the command and search it specifies. 

```node liri do-what-it-says```

<img src="images/liri-bot-5.png" alt="Terminal window showing the do-what-it-says command running 'spotify-this-song, I Want it That Way'">