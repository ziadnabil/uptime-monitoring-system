# Monitoring System

# Environment variables
- in the config folder:
    - .env.local to run project locally

    - .env.development for development stage on server

    - .env.staging for staging stage on server

    - .env.production for production stage on server

    - .env.test for running unit tests with ci/cd

    - .env.testlocal for running unit tests locally


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) v16.20.2

- Install [npm] (https://www.npmjs.com/) V8.19.4



# Getting started
- Clone the repository
```
git clone  <url>
```
- Install dependencies
```
npm install
```
- Build and run the project
```
npm run local
```
  Navigate to `http://localhost:5000`

- API Document endpoints

 postman: https://monitoring-system.postman.co/workspace/Team-Workspace~d3e2ae43-c584-4383-823b-9f65f7e2bdf8/collection/29490532-ed9ed8ad-2e68-45be-8376-d885f31e52e4

```

## Testing
The tests are  written in Mocha and the assertions done using Chai

```
"mocha": "^9.1.2"
"chai": "^4.3.4",
"chai-http": "^4.3.0",
```
### Running tests using NPM Scripts
````
npm run testlocal

````
Test files are created under test folder.