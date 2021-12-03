const request = require('request');

const fetchMyIP = function(responseHandler) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return responseHandler(error, null);
    } else if (response.statusCode !== 200) {
      return responseHandler(Error(`Status code: ${response.statusCode}. Response: ${body}`), null);
    }
    const IP = JSON.parse(body).ip;
    return responseHandler(null, IP);
  });
};

const fetchCoordsByIP = function(IP, responseHandler) {
  request(`https://freegeoip.app/json/${IP}`, (error, response, body) => {
    if (error) {
      return responseHandler(error, null);
    } else if (response.statusCode !== 200) {
      return responseHandler(Error(`Status code: ${response.statusCode}. Response: ${body}`), null);
    }
    const data = JSON.parse(body);
    return responseHandler(null, { lat: data.latitude, lon: data.longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, responseHandler) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
    if (error) {
      return responseHandler(error, null);
    } else if (response.statusCode !== 200) {
      return responseHandler(Error(`Status code: ${response.statusCode}. Response: ${body}`), null);
    }
    const data = JSON.parse(body).response;
    const readableData = data.map((time) => {
      const date = new Date(time.risetime * 1000);
      return `The ISS will pass at ${date.toLocaleTimeString()} on ${date.toLocaleDateString()} for ${time.duration} seconds!`;
    });
    return responseHandler(null, readableData);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(responseHandler) {
  console.log('Fetching IP...');
  fetchMyIP((error, IP) => {
    if (error) {
      return responseHandler('Error in fetchMyIP: ' + error, null);
    } else {
      console.log('Fetching coords...');
      fetchCoordsByIP(IP, (error, coords) => {
        if (error) {
          return responseHandler('Error in fetchCoordsByIP: ' + error, null);
        } else {
          console.log('Fetching flyover times...');
          fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
            if (error) {
              return responseHandler('Error in fetchISSFlyOverTimes: ' + error, null);
            } else {
              console.log('Success!\n');
              return responseHandler(null, flyOverTimes);
            }
          });
        }
      });
    }
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};