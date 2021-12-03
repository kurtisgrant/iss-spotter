const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(IP) {
  return request(`https://freegeoip.app/json/${IP}`);
};

const fetchISSFlyOverTimes = function(coords) {
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lon}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };