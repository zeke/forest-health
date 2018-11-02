# some zip files contain two differe shapefile sets
# This file splits them into IDS and FLOWN zip, so they can be ready by shp2json

for infile in original-zips/*.zip
do 
  echo
  echo $infile

  # make FLOWEN zip
  outdir="${infile/%.zip/-flowen}"
  outfile="${outdir}.zip"
  mkdir -p $outdir
  unzip $infile -d $outdir
  rm $outdir/IDS_*
  zip -r $outfile $outdir
  rm -rf $outdir

  # make IDS zip
  outdir="${infile/%.zip/-ids}"
  outfile="${outdir}.zip"
  mkdir -p $outdir
  unzip $infile -d $outdir
  rm $outdir/FLOWEN_*
  zip -r $outfile $outdir
  rm -rf $outdir
done
