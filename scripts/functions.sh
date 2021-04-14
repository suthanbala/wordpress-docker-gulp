#!/bin/bash

create_build_directory() {
    if [ ! -d ./build ] 
    then
        mkdir -p ./build
    fi
}

get_container_name() {
    image_name="$1"
    container_name=$(docker ps --filter "ancestor=$image_name" --format "{{.Names}}")
    echo "$container_name"
}


start_container_if_not_started() {
    image_name="$1"
    service_name="$2"
    container_name=$(get_container_name $image_name) #Find a running container with the given image name

    # A container is not running for the given image. Let's spin it up
    if [ -z "$container_name" ]; then
        docker-compose up -d "$service_name" > /dev/null
        container_manually_started=true
        container_name=$(get_container_name $image_name)
        echo ""
        echo "**Container wasn't started.. Started the container**"
        echo ""
    fi
}
