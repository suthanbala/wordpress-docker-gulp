#!/bin/bash
current_path="$(dirname "$0")"
source "$current_path/functions.sh"

# Vars
container_manually_started=false # Has the container started manually or was it already started
image_name="mysql"
service_name="mysql-wordpress" 

# Ensure the build directory exists
create_build_directory

echo "Please wait until we export your database...";

# Start the container if it hasn't started
start_container_if_not_started "$image_name" "$service_name"

# Get the container name
container_name=$(get_container_name $image_name)

# Run the command to export the MYSQL DB first. Then copy it to the host machine.
docker exec $container_name bash -c 'mysqldump -u$DB_USER -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE > /db.sql; exit';
docker cp $container_name:/db.sql ./build/db.sql

echo "Database successfully copied."

# If manually started the container, then let's stop it
if [ "$container_manually_started" = true ] ; then
    docker-compose stop "$service_name" > /dev/null
fi