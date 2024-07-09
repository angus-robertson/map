mkdir -p ./web/public/tiles

tippecanoe --no-feature-limit --no-tile-size-limit --no-tile-compression --exclude-all --minimum-zoom=5 --maximum-zoom=g --output-to-directory "./web/public/tiles" `find ./data -type f | grep .geojson`