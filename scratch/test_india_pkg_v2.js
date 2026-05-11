const locations = require('india-states-districts');
const states = locations.getAllStates();
console.log("States count:", states.length);
console.log("Sample states:", states.slice(0, 5));
const gujaratDistricts = locations.getDistrictsByState('Gujarat');
console.log("Gujarat Districts:", gujaratDistricts.slice(0, 5));
