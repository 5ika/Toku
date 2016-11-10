#!/bin/bash
docker run -d --name "app_$npm_package_name" -p $npm_package_docker_port:80 $npm_package_name
echo "Application $npm_package_name lancée sur le port $npm_package_docker_port"
