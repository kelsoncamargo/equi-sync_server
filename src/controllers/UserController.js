const USER_MODEL = require("../model/UserModel")
const EQUIPMENT_MODEL = require("../model/EquipmentModel")
const USER_FUNCTIONS = require("../functions/UserFunctions")
const { object, string } = require("zod")
const BCRYPT = require("bcrypt")
const JWT = require("jsonwebtoken")
require("dotenv").config()

class USER_CONTROLLER {
  constructor(){
    this.USER_MODEL = USER_MODEL
    this.EQUIPMENT_MODEL = EQUIPMENT_MODEL
    this.USER_FUNCTIONS = USER_FUNCTIONS
    this.ZOD_OBJECT = object
    this.ZOD_STRING = string
    this.BCRYPT = BCRYPT
    this.JWT = JWT
  }

 /**
  * Asynchronous function to register a new user.
  *
  * @param {Object} REQ - The HTTP request object.
  * @param {Object} REQ.body - The body of the HTTP request, which should contain the user data to be registered.
  * @param {string} REQ.body.NAME - The user's name.
  * @param {string} REQ.body.LAST_NAME - The user's last name.
  * @param {string} REQ.body.EMAIL - The user's email.
  * @param {string} REQ.body.PASSWORD - The user's password.
  * @param {string} REQ.body.CONFIR_PASS - The confirmation of the user's password.
  * @param {string} REQ.body.PHONE - The user's phone number.
  * @param {string} REQ.body.DOCUMENT_ID - The user's document ID.
  * @param {string} REQ.body.COMPANY_NAME - The user's company name.
  * @param {Object} RES - The HTTP response object.
  *
  * @returns {Promise<void>} Does not return anything, but sends an HTTP response to the client.
 */
  USER_REGISTER = async(REQ, RES) => {
    const { NAME, LAST_NAME, EMAIL, PASSWORD, CONFIR_PASS, PHONE, DOCUMENT_ID, COMPANY_NAME} = REQ.body

    const USER_SCHEMA = this.ZOD_OBJECT({
      NAME: this.ZOD_STRING().min(4).max(255),
      LAST_NAME: this.ZOD_STRING().min(4).max(255),
      EMAIL: this.ZOD_STRING().email().refine(async(EMAIL) => {
          return await this.USER_FUNCTIONS.VALIDATION_EMAIL(EMAIL)
      }, {
        message: "THE EMAIL IS ALREADY IN USE BY ANOTHER USER"
      }),
      PASSWORD: this.ZOD_STRING().min(6),
      CONFIR_PASS: this.ZOD_STRING().refine(CONFIR_PASS => CONFIR_PASS === PASSWORD, {
        message: "THE PASSWORD NO EQUAL CONFIR_PASS"
      }),
      PHONE: this.ZOD_STRING().min(9).max(15).refine(async(PHONE) => {
        return await this.USER_FUNCTIONS.VALIDATION_PHONE(PHONE)
    }, {
      message: "THE PHONE IS ALREADY IN USE BY ANOTHER USER"
    }),
      DOCUMENT_ID: this.ZOD_STRING().min(11).refine(async(DOCUMENT_ID) => {
        return await this.USER_FUNCTIONS.VALIDATION_DOCUMENT_ID(DOCUMENT_ID)
    }, {
      message: "THE DOCUMENT_ID IS ALREADY IN USE BY ANOTHER USER"
    }),
      COMPANY_NAME: this.ZOD_STRING().min(2).max(255),
    })

    try{
      await USER_SCHEMA.parseAsync({
        NAME,
        LAST_NAME,
        EMAIL,
        PASSWORD,
        CONFIR_PASS,
        PHONE,
        DOCUMENT_ID,
        COMPANY_NAME
      })

      try{
        const SALT = await this.BCRYPT.genSalt(12)
        const PASSHASH = await this.BCRYPT.hash(PASSWORD, SALT)
        const USER = new this.USER_MODEL({
          name: NAME,
          last_name: LAST_NAME,
          email: EMAIL,
          password: PASSHASH,
          phone: PHONE,
          document_id: DOCUMENT_ID,
          company_name: COMPANY_NAME
        })
        const EQUIPMENT = new this.EQUIPMENT_MODEL()
        await USER.save()
        await EQUIPMENT.save()
        try{
          USER.equipments = EQUIPMENT._id
          await USER.save()
          RES.status(201).json({ msg: "USER AND EQUIPMENT CREATED WITH SUCESS" })
        }catch(ERROR){
        RES.status(500).json({ msg: "HAVE A ERROR IN SERVER, IN ASSIGN EQUIPMENT ID TO THE USER, TRY AGAIN LATER "})
        }
      }catch(ERROR){
        RES.status(500).json({ msg: "HAVE A ERROR IN SERVER, IN CREATE USER AND EQUIPMENT USER, TRY AGAIN LATER " })
      }
      
    }catch(ERROR){
      RES.status(400).json({ msg: ERROR.message })
    }
  }

  /**
  * Asynchronous function to log in a user.
  *
  * @param {Object} REQ - The HTTP request object.
  * @param {Object} REQ.body - The body of the HTTP request, which should contain the user data to log in.
  * @param {string} REQ.body.EMAIL - The user's email.
  * @param {string} REQ.body.PASSWORD - The user's password.
  * @param {Object} RES - The HTTP response object.
  *
  * @returns {Promise<void>} Does not return anything, but sends an HTTP response to the client.
  */
  USER_LOGIN = async(REQ, RES) => {
    const USER_SCHEMA = this.ZOD_OBJECT({
      EMAIL: this.ZOD_STRING().email(),
      PASSWORD: this.ZOD_STRING.min(6)
    })

    const {EMAIL, PASSWORD} = REQ.body
    
    try {
      USER_SCHEMA.parseAsync({
        EMAIL,
        PASSWORD,
      })
  
      const USER = await this.USER_MODEL.findOne({ email: EMAIL })
      if(!!USER){
        return RES.status(404).json({ msg: "USER NOT FOUND" })
      }

      const CHECKPASS = await this.BCRYPT.compare(PASSWORD, USER.password)
      if(!CHECKPASS){
        return RES.status(404).json({ msg: "PASSWORD INVALID" })
      }

      const ID = USER._id
      const SECRET = process.env.SECRET
      const TOKEN = this.JWT.sign({
          id: USER._id,
      }, SECRET, {
          expiresIn: '24h'
      })

      USER.white_token = TOKEN
      await USER.save()
      
      RES.status(200).json({ msg: "THE USER LOGGED IN SUCCESSFULLY", TOKEN, ID })
    }catch(ERROR){
      RES.status(500).json({ msg: ERROR })      
    }
  }
}

module.exports = USER_CONTROLLER