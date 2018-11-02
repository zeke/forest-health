const walk = require('walk-sync').entries
const path = require('path')
const fs = require('fs')
const { get, intersection, pick } = require('lodash')
const dataDir = path.join(__dirname, 'data-json')
const json2csv = require('json2csv').parse
const bigJSON = require('big-json')
const findCounty = require('./find-county')

const fields = []
let allRows = []

// collection all rows from all files
walk(dataDir)
  .filter(file => file.relativePath.endsWith('.json'))
  .filter(file => file.relativePath.includes('-ids'))
  .forEach(file => {
    const fullPath = path.join(dataDir, file.relativePath)
    console.log(file.relativePath)
    const rows = getRowsFromFile(fullPath)
    fields.push(Object.keys(rows[0]))
    allRows = allRows.concat(rows)
  })

console.log('find fields that are present in every dataset')
const commonFields = intersection(...fields)

commonFields.push('county')
fs.writeFileSync(path.join(__dirname, 'fields.json'), JSON.stringify(commonFields, null, 2))

console.log('clean up each row so it only includes the common fields')
allRows = allRows.map(row => { 
  const result = pick(row, commonFields)
  const county = findCounty([result.lng, result.lat])
  if (county && county.NAME10) {
    result.county = county.NAME10
    console.log(result.county)
  }
  return result
})

const jsonFile = path.join(__dirname, 'allRows.json')
const outStream = fs.createWriteStream(jsonFile) 
console.log(`write ${allRows.length} rows to ${jsonFile}`)

const stringifyStream = bigJSON.createStringifyStream({body: allRows})

// stringifyStream.on('data', () => {
//   process.stdout.write('.')
// })
stringifyStream.on('end', () => {
  console.log('done')
})

stringifyStream.pipe(outStream)

function getRowsFromFile (fullPath) {
  const data = require(fullPath)
  
  if (!data.features) {
    console.log('no features found', fullPath)
  }
  const {features} = data

  const rows = features.map(feature => {
    let result = Object.assign({}, feature.properties)
    let coords = get(feature, 'geometry.coordinates.0.0')
    if (!coords) {
      console.log('no coords found', fullPath)
    } else {
      // console.log('coords', coords)
      result.lng = coords[0]
      result.lat = coords[1]
    }
    return result
  })

  return rows
}