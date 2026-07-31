# Use Node.js 20 base image
FROM node:20

# Install ffmpeg, python, and yt-dlp
RUN apt-get update && apt-get install -y ffmpeg python3 python3-pip
RUN pip3 install --upgrade yt-dlp --break-system-packages

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Hugging Face requires port 7860
ENV PORT=7860
EXPOSE 7860

# Start the app
CMD [ "node", "server.js" ]
