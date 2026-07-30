# Use Node.js 20 base image (Fixes the File is not defined error)
FROM node:20

# Install ffmpeg, python, and yt-dlp
RUN apt-get update && apt-get install -y ffmpeg python3 python3-pip
RUN pip3 install yt-dlp --break-system-packages

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port Render uses
EXPOSE 10000

# Start the app
CMD [ "node", "server.js" ]
