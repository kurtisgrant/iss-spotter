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

module.exports = { fetchMyIP };