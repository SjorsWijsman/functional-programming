const fetchApi = require("./fetchApi.js");
const dataTransform = require("./dataTransform.js");

fetchApi("gekentekende_voertuigen").then(res => {
  // Check if response gave an error
  if (res.FetchError) {
    console.error(res);
  }
  // Else, go do stuff with the data
  else {
    // res = dataTransform.getColumn(res, "kenteken");
    // res = dataTransform.getColumns(res, ["kenteken", "eerste_kleur"]);
    // keys = dataTransform.getKeys(res);
    displayData(res);
  }
});

function displayData(res) {
  console.log(res);
};
