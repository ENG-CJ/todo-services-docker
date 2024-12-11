# Stage 1: Build the Vite app
FROM node:18-alpine as build

# Set the working directory
WORKDIR /frontend

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the Vite app for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove the default Nginx HTML files
RUN rm -rf ./*

# Copy the build output from the first stage
COPY --from=build /frontend/dist/ .

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]