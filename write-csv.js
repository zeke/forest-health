// Stream the JSON results into a CSV file
// Streaming is required because the full dataset is too big to fit in memory

const fs = require('fs')
const path = require('path')
const json2csv = require('json2csv')
const fields = require('./fields.json')
const opts = { fields }
const transformOpts = { encoding: 'utf-8' }
const inputPath = path.join(__dirname, 'allRows.json')
const outputPath = path.join(__dirname, 'allRows.csv')
const input = fs.createReadStream(inputPath, { encoding: 'utf8' })
const output = fs.createWriteStream(outputPath, { encoding: 'utf8' })
const csvStream = new json2csv.Transform(opts, transformOpts)

csvStream
  // .on('header', header => console.log(header))
  // .on('line', line => console.log(line))
  .on('error', err => console.log(err))
 
input.pipe(csvStream).pipe(output)
