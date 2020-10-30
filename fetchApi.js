const fetch = require("node-fetch");

/*
    Fetch from api endpoint
*/
module.exports = function fetchApi(endPoint) {
  // Available endpoints
  const endPoints = {
    gekentekende_voertuigen: "http://opendata.rdw.nl/resource/m9d7-ebf2.json",
  }

  const options = {
    method: 'GET',
    data: {
      "$limit": 1,
    },
  }

  const api = endPoints[endPoint];

  // Fetch from endpoint
  return fetch(api, options)
    .then(res => res.json())
    .catch(err => { return err })
}
