const fs = require('fs');
const locations = require('india-states-districts');

const allStates = locations.getAllStates();
const formattedData = {};

allStates.forEach(state => {
  const districts = locations.getDistrictsByState(state);
  formattedData[state] = districts;
});

fs.writeFileSync('./lib/indian-geo-data.json', JSON.stringify(formattedData, null, 2));
console.log("Generated JSON for " + Object.keys(formattedData).length + " states.");
console.log("Sample check Gujarat:", formattedData["Gujarat"].slice(0, 3));
