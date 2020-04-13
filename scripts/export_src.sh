echo "Please wait while we're exporting the WordPress files..."
docker cp wp:/var/www/html/ ./build/
echo "Successfully exported the files."