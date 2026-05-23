const locations = require('india-states-districts');
console.log(Object.keys(locations));
const states = locations.states();
console.log("Sample states:", states.slice(0, 5));
const districts = locations.districts('Gujarat');
console.log("Districts of Gujarat:", districts);
