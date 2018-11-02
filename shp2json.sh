# convert shapefile zips to GEOJSON

for infile in data-zip/*.zip
do 
  echo $infile
  outfile="${infile/%.zip/.json}"
  outfile="${outfile/data-zip/data-json}"
  echo $outfile
  echo
  shp2json $infile > $outfile
done
