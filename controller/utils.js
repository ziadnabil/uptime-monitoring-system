const db = require('../models/index');
const { NotFound, BadRequest, AlreadyExist } = require('../utils/Errors');
const { hotp } = require('otplib');
hotp.options = { digits: 6 };

// prettier-ignore
module.exports = {
  /*
  * Validate partner registration fields ensuring the fields meet the criteria
  * @param {String} phoneNumber
  */
  validateEmail: async function (email) {
    return new Promise((resolve, reject) => {
      let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(String(email))) {
        reject(new BadRequest("Enter valid email"))
      }
      resolve()
    })
  },

  findOneEntryAndError: async (where, dbTable, exclude = null, include) => {
    if (!dbTable) throw new BadRequest("can't find table entry with a null value")

    let entry = await db[dbTable].findOne({ where, include, attributes: { exclude } });
    if (entry === null) throw new NotFound(`${dbTable}`)

    return entry
  },
  
  checkEmail: async function (email) {
    return new Promise(async (resolve, reject) => {
      const users = ['User'] // can be added if i want to search more than one table
      for await (one of users) {
        let checkEmail = await db[one].findOne({ where: { email: email } })
        if (checkEmail) {
          reject(new AlreadyExist("email"))
        }
      }
      resolve()
    })
  },

  generateCode: async (email) => {
    try {
      code = hotp.generate(email, new Date().getHours())
      return code
    }
    catch (error) {
      throw error
    }
  },
}
