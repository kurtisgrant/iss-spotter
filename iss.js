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

module.exports = { fetchMyIP, fetchCoordsByIP };