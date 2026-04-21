FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 4210

# Start the application
CMD ["npm", "start"]
