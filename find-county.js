const got = require('got')
// const counties = require('us-counties')
// const counties = require('./nm-and-az-counties.json')
// const whichPolygon = require('which-polygon')
// module.exports = whichPolygon(counties)

module.exports = async function findCounty (lng, lat) {
  const url = `http://localhost:5000/?lng=${lng}&lat=${lat}`
  const { body } = await got(url, {json: true})
  // console.log(body)
  return {
    county: body.NAME10,
    state: body.state
  }
}