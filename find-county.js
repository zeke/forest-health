// const counties = require('us-counties')
const counties = require('./nm-and-az-counties.json')
const whichPolygon = require('which-polygon')
module.exports = whichPolygon(counties)