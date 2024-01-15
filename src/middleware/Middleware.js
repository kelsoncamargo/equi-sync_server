require("dotenv").config()
const USER_MODEL = require("../model/UserModel")
const BCRYPT = require("bcrypt")
const JWT = require("jsonwebtoken")
const GET_TOKEN_HEAD = require("./GetTokenHead")

class MIDDLEWARES {
  constructor(){
    this.USER_MODEL = USER_MODEL
    this.BCRYPT = BCRYPT
    this.JWT = JWT
    this.GET_TOKEN_HEAD = GET_TOKEN_HEAD
  }

  /**
   * CHECK the @USER_ID and @TOKEN
   * Extracts the @USER_ID from the request parameters and checks if it is valid
   * Finds the @USER in the database using the extracted @USER_ID
   * Extracts the @TOKEN form the request header and checks if it exists
   * Verifies the @TOKEN using the @SECRET key stored in the environment variable
   * Compares the extracted @TOKEN with the @WHITE_TOKEN stored in the @USERS database record
   * If the @TOKENs match. calls the @NEXT middleware function
   * If the @TOKENs not match or an error occurs during verification, sends an appropriate response.
   * @param {Object} REQ - The request object.
   * @param {Object} RES - The response object.
   * @param {Function} NEXT - The next function of the middleware.
   */
  CHECK_TOKEN_AND_ID = async(REQ, RES, NEXT) => {
    const USER_ID = REQ.params.id
    if(USER_ID.lenght !== 24){
      return RES.status(422).json({ msg: "USER ID IS INVALID" })
    }

    const USER = await this.USER_MODEL.findById(USER_ID)
    if(!USER){
      return RES.status(422).json({ msg: "USER NOT EXIST" })
    }

    const TOKEN = await this.GET_TOKEN_HEAD(REQ)
    if(!TOKEN){
      return RES.status(401).json({ msg: "ACESS DENIED" })
    }

    try{
      const SECRET = process.env.SECRET
      const WHITE_TOKEN = await USER.white_token

      this.JWT.verify(TOKEN, SECRET)
      
      if(TOKEN === WHITE_TOKEN){
        NEXT()
      }else{
        RES.status(400).json({ msg: "INVALID TOKEN" })
      }

    }catch(ERROR){
      RES.status(400).json({msg: "INVALID TOKEN"})
    }
  }

  /**
   * Check if the @TOKEN is in the @BLACKLIST
   * Extracts the authorization header from the request and splits it to get the @TOKEN
   * Searches the database for a @USER with the extracted @TOKEN in the @BLACKLIST field.
   * If the @TOKEN is not found in the @BLACKLIST calls the @NEXT middleware function.
   * If the @TOKEN is found in the @BLACKLIST sends a response indicating that the @TOKEN is in the @BLACKLIST
   * @param {Object} REQ - The request object.
   * @param {Object} RES - The response object.
   * @param {Function} NEXT - The next function of the middleware.
  */
  VALIDATIONS_TOKEN_BANLIST =  async(REQ, RES, NEXT) => {
    const AUTH_HEADER = REQ.headers["authorization"]
    const TOKEN = AUTH_HEADER && AUTH_HEADER.split(" ")[1]
    const BLACK_TOKEN = await this.USER_MODEL.findOne({black_token: TOKEN})

    if(!BLACK_TOKEN){
      NEXT()
    }else{
      RES.status(400).json({ msg: 'TOKEN IN BANLIST' })
    }
  }

}

module.exports = MIDDLEWARES