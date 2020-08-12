if [ ! -d ./build ] 
then
    mkdir -p ./build
fi
echo "Please wait while we're exporting the WordPress files..."
container_name=$(docker ps --filter "ancestor=wordpress:latest" --format "{{.Names}}")
docker cp $container_name:/var/www/html/ ./build
echo "Successfully exported the files."