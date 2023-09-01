var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


const hashPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(password, salt);
    resolve(hashedPassword)
  })
}

const checkPassword = async (password, hashedPassword) => {
  return new Promise(async (resolve, reject) => {
    const check = await bcrypt.compare(password, hashedPassword)
    resolve(check)
  })
}

const hashPin = async (pin) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPin = bcrypt.hashSync(pin, salt);
    resolve(hashedPin)
  })
}

const checkPin = async (pin, hashedPin) => {
  return new Promise(async (resolve, reject) => {
    const check = await bcrypt.compare(pin, hashedPin)
    resolve(check)
  })
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { algorithm: 'HS256' });
}

const decodeToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN)
}

module.exports = { hashPassword, checkPassword, generateToken, decodeToken, hashPin, checkPin }


