/*
- create and clone down a github repository
- touch server.js
- npm init
- npm install -S express dotenv cors
- setup the server.js file
  - load the packages
  - create the app
  - create routes
  - start the server
- THEN work on your routes
*/

/*
The Environment: the collection of all variables that belong the the terminal window your code is running in
I want to use the PORT the computer wants me to use since the port is a computerish thing
I will pick my port from the environment.
creating a variable in your terminal's env is `export VARNAME=value`
It is semantic to name your variables in all caps
If I want to look at the env variables in the terminal type: `env`
if I want to see them in javascript: `process.env.VARNAME`
As devs, we can save our environment variables in a file called `.env`
When data is sent from the client to the back end it comes in a property: `request.query`
*/


// ============== Packages ==============================

const express = require('express');
const cors = require('cors'); // just kinda works and we need it
// If this line of code comes, delete it const { response } = require('express');
require('dotenv').config(); // read the `.env` file's saved env variables AFTER reading the terminal's real env's variables


// ============== App ===================================

const app = express(); // express() will return a fully ready to run server object
app.use(cors()); // enables local processes to talk to the server // Cross Origin Resource Sharing

const PORT = process.env.PORT || 3000; // process.env is boilerplace the variable name is potato
console.log(process.env.candy);


// ============== Routes ================================

app.get('/location', handleGetLocation);

function handleGetLocation(req, res){
  // console.log(req, res);
  console.log(req.query); // {city: seattle} /// req.query.city : seattle
  const dataFromTheFile = require('./data/location.json'); // in an express server, we can synchronously get data from a local json file without a .then


  const output = new LocationKit(dataFromTheFile, req.query.city);

  res.send(output);
}


function LocationKit(dataFromTheFile, cityName){
  this.search_query = cityName;
  this.formatted_query = dataFromTheFile[0].display_name;
  this.latitude = dataFromTheFile[0].lat;
  this.longitude = dataFromTheFile[0].lon;
}



app.get('/weather', handleGetWeather);

function handleGetWeather(req, res){
  const dataFromTheFile = require('./data/weather.json');

    const output = []
    dataFromTheFile.data.forEach(dayOfWeek => {
      output.push(new WeatherKit(dayOfWeek));
    })
  
  res.send(output);
}


function WeatherKit(object) {
  this.forecast =  object.weather.description;
  this.time = object.valid_date;
}


// ============== Initialization ========================

// I can visit this server at http://localhost:3009
app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`)); // this is what starts the server




            