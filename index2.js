const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

fetchMyIP()
  .then(body => JSON.parse(body).ip)
  .then(IP => fetchCoordsByIP(IP))
  .then(body => JSON.parse(body))
  .then(data => {
    return { lat: data.latitude, lon: data.longitude };
  })
  .then(coords => fetchISSFlyOverTimes(coords))
  .then(data => JSON.parse(data).response)
  .then(data => data.map((line) => {
    const date = new Date(line.risetime * 1000);
    return `The ISS will pass at ${date.toLocaleTimeString()} on ${date.toLocaleDateString()} for ${line.duration} seconds!`;
  }))
  .then(results => console.log(results))
  .catch(err => Error(err));