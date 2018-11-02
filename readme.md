# forest-health 

New Mexico Forest Health: Insect Disease GIS Data

This project is an effort to collect 18 years of data about insects and diseases affecting forests in New Mexico and Arizona.

The original shapefiles available for download at [www.fs.usda.gov](https://www.fs.usda.gov/detail/r3/landmanagement/gis/?cid=stelprd3805189). This project
converts those shapefiles into a single CSV (comma-separated value) file that can be used in spreadsheet applications like Excel and Numbers.

## Dependencies

- [big-json](https://github.com/DonutEspresso/big-json): A stream based implementation of JSON.parse and JSON.stringify for big POJOs
- [json2csv](https://github.com/zemirco/json2csv): Convert JSON to CSV
- [lodash](https://github.com/lodash/lodash): Lodash modular utilities.
- [shp2json](https://github.com/substack/shp2json): Convert shapefile zip archives into GeoJSON using ogr2ogr with a streaming interface
- [us-counties](https://github.com/zeke/us-counties): A GeoJSON object containing geometries of every county in the US
- [walk-sync](https://github.com/joliss/node-walk-sync): Get an array of recursive directory contents
- [which-polygon](https://github.com/mapbox/which-polygon): Index for matching points against a set of GeoJSON polygons