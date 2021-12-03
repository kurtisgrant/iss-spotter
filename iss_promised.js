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

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(body => JSON.parse(body).ip)
    .then(IP => fetchCoordsByIP(IP))
    .then(body => {
      const data = JSON.parse(body);
      return { lat: data.latitude, lon: data.longitude };
    })
    .then(coords => fetchISSFlyOverTimes(coords))
    .then(body => {
      const data = JSON.parse(body).response;
      return data.map(dataLn => {
        const riseTime = new Date(dataLn.risetime * 1000);
        return `The ISS will pass at ${riseTime.toLocaleTimeString()} on ${riseTime.toLocaleDateString()} for ${dataLn.duration} seconds!`;
      });
    });
};

module.exports = { nextISSTimesForMyLocation };