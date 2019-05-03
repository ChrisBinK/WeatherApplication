/*
* Controller to handles all request to the api.
*/

// Get the API information stored in WeatherOnlineAPi class
const weatherApi =  require('../models/WeatherOnline');
const express = require('express');
const request = require('request');
const util = require('util')


// Display weather prediction for the next 7 days, default city Johannesburg
exports.index =  function(req, res){
    let location= "Johannesburg"; 
    displayWeather(location, res); 
};

exports.weather_update = function(req, res){
    location = req.body.location_search;
    // Set a default location when user submit empty string
    if(location ===''){
        location = "Johannesburg";
    }
    
    displayWeather(location, res);
}

function displayWeather(location, response){
    getWeatherData(location).then(function(finalData){
        if (finalData ===undefined)
        {
            finalData = "Could not load data....";
        }
        response.render('index', { title: finalData.locationName,  data: finalData});
    })
    .catch(function (err) {
        response.render('error', {status: 404, message: err});
   });
}

function getWeatherData(cityName)
{     
    let locationName = cityName + weatherApi.optional_params();
    let worldOnlineApiUrlPath=  weatherApi.base_url() + locationName;
    // make a get request
    return sendRequest(worldOnlineApiUrlPath).then(function(data){
         return displayWeatherAndTimePerCity(data);
    });
      
}


async function sendRequest(locationUrl)
{   
    let requestPromise =  util.promisify(request)
     try {
        let response = await requestPromise(locationUrl);//('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=3cf77d9299ee42a08c5162233191303&q=Johannesburg&num_of_days=7&format=json');
        return JSON.parse(response.body);
     } catch (error) {
        throw new Error( "Could not  make call to api...");
     }
      
    
}

function displayWeatherAndTimePerCity(weatherPerCity){   
    // create an object to hold the data
    let wd =  new weatherApi.WeatherData();

    if (weatherPerCity.data.hasOwnProperty("error")){
        throw new Error (weatherPerCity.data.error[0].msg)
    }
    
    weatherPerCity.data.current_condition.forEach(cityElement => {
        wd.locationName = weatherPerCity.data.request[0].query;
        wd.currentTime = cityElement.observation_time;
        wd.currentTempCelcius = cityElement.temp_C;
        wd.currentWeatherIcon = cityElement.weatherIconUrl[0].value;
        wd.precipitation =cityElement.precipMM;
        wd.humidity= cityElement.humidity;
        wd.windSpeed = cityElement.windspeedKmph;
        wd.uvIndex = cityElement.uvIndex;
        wd.currentDescription = cityElement.weatherDesc[0].value;
       
    });
    wd.weeklyWeather =   weatherPerCity.data.weather.slice();
    return wd;
}
 
