# Use the official Nginx image as the base image
FROM nginx:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install application dependencies
RUN npm install
RUN npm run build 
# Copy the rest of the application code to the working directoryi
RUN mv ./build/* /usr/share/nginx/html
# Expose the port that the app will run on (assuming your app runs on port 80)
RUN rm -rf /usr/src/app/*
# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

