/**
 * Class to store constant such as url for the api 
 */
 

module.exports = {
    base_url: function () {
        return 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=85a54468c9e741dbb11171252191405&q=';
    },
    optional_params: function () {
        return '&num_of_days=7&format=json';
    },
    WeatherData:  class WeatherDataInfo {
        constructor(){
            this.locationName = '' ;
            this.currentTime = '';
            this.currentTempCelcius='';
            this.currentWeatherIcon ='';
            this.currentDescription ='';
            this.precipitation ='';
            this.humidity ='';
            this.windSpeed='';
            this.cloudcover ='';
            this.uvIndex = 0;
            this.weeklyWeather = [];
        }
        
    }
  };






 