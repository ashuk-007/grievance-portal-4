const fetch = require("node-fetch");
const fs = require("fs");

fetch("https://api.covid19india.org/state_district_wise.json")
  .then((response) => response.json())
  .then((data) => {
    let districtSet = new Set();
    for (const state in data) {
      const districts = data[state].districtData;
      for (const district in districts) {
        districtSet.add(district);
      }
    }
    const districtArray = Array.from(districtSet); // Convert the Set to an array
    districtArray.sort(); // Sort the array in alphabetical order
    const districtString = JSON.stringify(districtArray);
    fs.writeFileSync("districts.txt", districtString);
  })
  .catch((error) => console.error(error));
