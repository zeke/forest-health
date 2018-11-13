const walk = require('walk-sync').entries
const path = require('path')
const fs = require('fs')
const { get, intersection, pick } = require('lodash')
const dataDir = path.join(__dirname, 'data-json')
const json2csv = require('json2csv').parse
const bigJSON = require('big-json')
const findCounty = require('./find-county')
const desiredFields = [
  'SURVEY_YEA',
  'DMG_TYPE',
  'MORT_TPA',
  'AGNT_NM',
  'ACRES'
]

const fields = []
let allRows = []

main()

async function main() {

  // collection all rows from all files
  walk(dataDir)
    .filter(file => file.relativePath.endsWith('.json'))
    .filter(file => file.relativePath.includes('-ids'))
    .forEach(file => {
      const fullPath = path.join(dataDir, file.relativePath)
      console.log(file.relativePath.match(/(\d+)/)[1]) // print year of filename
      const rows = getRowsFromFile(fullPath)
      fields.push(Object.keys(rows[0]))
      allRows = allRows.concat(rows)
    })

  console.log('find fields that are present in every dataset')
  const commonFields = intersection(...fields)

  commonFields.push('county', 'state')
  fs.writeFileSync(path.join(__dirname, 'fields.json'), JSON.stringify(commonFields, null, 2))

  console.log('clean up each row so it only includes the common fields')
  for (let row of allRows) {
    row = pick(row, commonFields)
    const county = await findCounty(row.lng, row.lat)
    if (county) {
      Object.assign(row, county)
      console.log(row.county, row.state)
    }
  }

  const jsonFile = path.join(__dirname, 'allRows.json')
  const outStream = fs.createWriteStream(jsonFile) 
  console.log(`write ${allRows.length} rows to ${jsonFile}`)

  const stringifyStream = bigJSON.createStringifyStream({body: allRows})

  stringifyStream.on('end', () => {
    console.log('done')
  })

  stringifyStream.pipe(outStream)
}

function getRowsFromFile (fullPath) {
  const data = require(fullPath)
  
  if (!data.features) {
    console.log('no features found', fullPath)
  }
  const {features} = data

  const rows = features.map(feature => {
    let row = pick(feature.properties, desiredFields)
    const coords = get(feature, 'geometry.coordinates.0.0')
    row.lng = coords[0]
    row.lat = coords[1]
    return row
  })

  return rows
}

