FROM node:16-alpine
WORKDIR /clans
# Copy and download dependencies
COPY package.json ./
RUN npm install
# Copy the source files into the image
COPY . .
EXPOSE 3000
CMD node ./src/data_base/index.js