const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    max: process.env.RATE_LIMIT, //1000
    windowMs:   60 * 1000 ,
//     expireTimeMs: 1000 ,
    message: "Too many request from this IP",

});

module.exports = limiter