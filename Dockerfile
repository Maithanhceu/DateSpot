# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the Server folder
COPY Server/package*.json ./

# Install dependencies (including packages in node_modules)
RUN npm install

# Copy all files from the Server folder (including .env, db.sql, photos, and server.js)
COPY Server/.env ./
COPY Server/db.sql ./
COPY Server/autopopulate.json ./
COPY Server/Photos ./Photos/
COPY Server/server.js ./

# Expose the port the app will run on (you can change this if needed)
EXPOSE 1113

# Run the server using node
CMD ["node", "server.js"]
