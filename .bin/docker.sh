
#! /bin/bash
set -e

service=$1

if [ "$service" == "client" ]; then
    echo "nothing here yet"
elif [ "$service" == "server" ]; then
    cd server/
    docker build -t lens-api .
    docker run -d -p 4000:4000 lens-api:latest

    echo "\n\n🚀 Available at http://localhost:4000/ 🚀"
else
    echo "Invalid argument \"$service\". expected (client | server)"
    exit 1
fi
