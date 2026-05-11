const fs = require('fs');
const locations = require('india-states-districts');
const allData = locations.getAllStatesWithDistricts();
const formattedData = {};
allData.forEach(item => {
  formattedData[item.state] = item.districts;
});
fs.writeFileSync('./lib/indian-geo-data.json', JSON.stringify(formattedData, null, 2));
console.log("Successfully saved state and district cache to lib/indian-geo-data.json");
