// The full counties list is sometimes too big to fit in memory.
// This script filters down the full US list to include only New Mexico and Arizona

const desiredCounties = [
  '35', // nm
  '04' // az
]


const fs = require('fs')
const path = require('path')
let counties = require('us-counties')
counties.features = counties.features
  .filter(feature => desiredCounties.includes(feature.properties.STATEFP10))

const outfile = path.join(__dirname, 'nm-and-az-counties.json')
fs.writeFileSync(outfile, JSON.stringify(counties, null, 2))