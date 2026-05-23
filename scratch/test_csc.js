const { State, City } = require('country-state-city');
const states = State.getStatesOfCountry('IN');
console.log("Sample States:", states.slice(0, 3));
const sampleStateCode = states.find(s => s.name === 'Gujarat').isoCode;
const cities = City.getCitiesOfState('IN', sampleStateCode);
console.log("Sample Cities in Gujarat:", cities.slice(0, 10).map(c => c.name));
