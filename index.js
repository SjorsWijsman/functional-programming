const fetch = require('node-fetch');

// Available APIs
const apis = {
  Gekentekende_voertuigen: "http://opendata.rdw.nl/resource/m9d7-ebf2.json",
}

// Fetch from API
function fetchApi(api) {
  return fetch(apis[api])
    .then(res => res.json())
    .catch(err => { return err })
}


fetchApi("Gekentekende_voertuigen").then(res => {
  if (!res.FetchError) {
    console.log(res)
  } else {
    console.error(res);
  }
});
