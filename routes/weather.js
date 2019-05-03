
var express =  require('express');
var router = express.Router();

//Get controller funtion/callbacks
var weather_api_controller = require('../controller/weatherController');

// Define the route and handler for each route
router.get('/', weather_api_controller.index);

// for  handling other city /location name
router.post('/',weather_api_controller.weather_update);

module.exports = router;
