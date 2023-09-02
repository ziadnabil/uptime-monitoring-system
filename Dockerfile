FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy your application code to the container
COPY . .

EXPOSE 3000

# Define the command to start your application
CMD ["npm", "run","development"]