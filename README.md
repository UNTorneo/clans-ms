# clans

Created by Juan Eduardo Bedoya

This is the microservice for the clans software module.

# Build docker image

docker build -t clans-microservice-express .

docker run -p 8080:3000 -e dbUrl=172.17.0.1 -e dbPort=5431 -e dbUser=admin -e dbPassword=bedoya2501 -e dbName=api clans-microservice-express
