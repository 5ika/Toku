#!/bin/bash
yarn
grunt build
docker build -t $npm_package_name .
echo "Terminé."
