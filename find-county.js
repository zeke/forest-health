// const counties = require('us-counties')
const counties = require('./nm-counties.geo.json')
const whichPolygon = require('which-polygon')
module.exports = whichPolygon(counties)