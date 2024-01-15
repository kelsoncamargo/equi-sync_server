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

  USER_REGISTER = async(REQ, RES) => {
    const USER_SCHEMA = this.ZOD_OBJECT({
      NAME: this.ZOD_STRING().min(4).max(255),
      LAST_NAME: this.ZOD_STRING().min(4).max(255),
      EMAIL: this.ZOD_STRING().email().refine(async(IN_EMAIL) => {
        return await this.USER_FUNCTIONS.VALIDATION_EMAIL(IN_EMAIL)
      }, {
        message: "THE EMAIL IS ALREADY IN USE BY ANOTHER USER"
      }),
      PASSWORD: this.ZOD_STRING.min(6),
      CONFIR_PASS: this.ZOD_STRING().refine((VALUE, CONTEXT) => VALUE === CONTEXT.sibling.PASSWORD, {
        message: "THE PASSWORD NO EQUAL CONFIR_PASS"
      }),
      PHONE: this.ZOD_STRING.min(9).max(15).refine(async(IN_PHONE) => {
        return await this.USER_FUNCTIONS.VALIDATION_PHONE(IN_PHONE)
      }, {
        message: "THE PHONE IS ALREADY IN USE BY ANOTHER USER"
      }),
      DOCUMENT_ID: this.ZOD_STRING.min(11).refine(async(IN_DOCUMENT_ID) => {
        return await this.USER_FUNCTIONS.VALIDATION_DOCUMENT_ID(IN_DOCUMENT_ID)
      }, {
        message: "THE DOCUMENT_ID IS ALREADY IN USE BY ANOTHER USER"
      })
    })
    
    const { NAME, LAST_NAME, EMAIL, PASSWORD, CONFIR_PASS, PHONE, DOCUMENT_ID, COMPANY_NAME} = REQ.body

    try {
      USER_SCHEMA.parseAsync({
        NAME,
        LAST_NAME,
        EMAIL,
        PASSWORD,
        CONFIR_PASS,
        PHONE,
        DOCUMENT_ID
      })

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
      try {
        USER.equipments = EQUIPMENT._id
        await USER.save()
        RES.status(201).json({ msg: "USER AND EQUIPMENT CREATED WITH SUCESS" })
      }catch(ERROR){
        RES.status(500).json({ msg: "HAVE A ERROR IN SERVER, IN CREATE EQUIPMENT, TRY AGAIN LATER " })
      }
    }catch(ERROR){
      RES.status(500).json({ msg: "HAVE A ERROR IN SERVER, IN CREATE USER, TRY AGAIN LATER " })
    }
  }
}

module.exports = USER_CONTROLLER