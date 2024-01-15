const USER_MODEL = require("../model/UserModel")


const USER_FUNCTIONS = {
  /**
  * Searches in @USER database for the value and returns if it hears something like it
  * @param {String} IN_EMAIL - The request String.
  */
  VALIDATION_EMAIL: async(IN_EMAIL) => {
    const EMAIL = await USER_MODEL.findOne({ email: IN_EMAIL })
    return EMAIL? false : true
  },
  /**
  * Searches in @USER database for the value and returns if it hears something like it
  * @param {String} IN_DOCUMENT_ID - The request String.
  */
  VALIDATION_DOCUMENT_ID: async(IN_DOCUMENT_ID) => {
    const DOCUMENT_ID = await USER_MODEL.findOne({ document_id: IN_DOCUMENT_ID })
    return DOCUMENT_ID? false : true
  },
  /**
  * Searches in @USER database for the value and returns if it hears something like it
  * @param {String} IN_PHONE - The request String.
  */
  VALIDATION_PHONE: async(IN_PHONE) => {
    const PHONE = await USER_MODEL.findOne({ phone: IN_PHONE })
    return PHONE? false : true
  }
}

module.exports = USER_FUNCTIONS