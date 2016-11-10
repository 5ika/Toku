#!/bin/bash
docker rm -f "app_$npm_package_name"
docker rmi $npm_package_name
echo "Terminé."
