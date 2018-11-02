// The full counties list is sometimes too big to fit in memory.
// This script filters down the full US list to include only New Mexico

// NM STATEFP10: '35'
// AZ: TODO

const fs = require('fs')
const path = require('path')
let counties = require('us-counties')
counties.features = counties.features.filter(feature => feature.properties.STATEFP10 === '35')

const outfile = path.join(__dirname, 'nm-counties.geo.json')
fs.writeFileSync(outfile, JSON.stringify(counties, null, 2))