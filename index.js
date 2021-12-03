const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("174.114.33.168", (error, coords) => {
//   if (error) {
//     return console.log("Didn't work ", error);
//   }
//   return console.log("It worked! ", coords);

// });

// fetchISSFlyOverTimes({ lat: 45.4677, lon: -75.5399 }, (error, flyOverTimes) => {
//   if (error) {
//     return console.log("Didn't work ", error);
//   }
//   return console.log("It worked! ", flyOverTimes);

// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log(error);
  }
  return console.log(passTimes, '\n');
});
