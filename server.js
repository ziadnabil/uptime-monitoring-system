const path = require('path');

require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });
const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan')
const cron = require("node-cron")
// Data Base
const db = require('./models/index');
const limiter = require('./config/limiter');
const { schedulePolling } = require('./services/pollingRequest.service');

//DB options
if (!process.env.NODE_ENV.includes('test')) {
    db.sequelize.sync({alter: true }).then(() => {
        
        console.log('db connected')
    }) .catch((error) => console.log(error));

  app.use(helmet());
  app.use(limiter);
}

//router
const router = require('./routes/router');

//error handle
const errorHandler = require('./middleware/error');

// parser 
const formparser = require('express-formidable');
const customParser = require('./middleware/customParser')
const logger = require('./config/logger');

app.use(cors({
    origin: JSON.parse(process.env.WHITE_LIST),
    credentials:true,
}));

app.use(formparser({
    encoding: 'utf-8',
    multiples: true, // req.files to be arrays of files
}))

  const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        // Configure Morgan to use custom logger with the http severity
        write: (message) => logger.http(message.trim()),
      },
    }
  );

app.use(customParser())
app.use(morganMiddleware);
app.use(router)

// error handler always last thing to use
app.use(errorHandler)
app.listen(PORT, () => console.log(`server is running  in ${process.env.NODE_ENV} on port ${PORT}`))

schedulePolling();

module.exports = app
