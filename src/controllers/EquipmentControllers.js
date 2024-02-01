const USER_MODEL = require("../model/UserModel")
const EQUIPMENT_MODEL = require("../model/EquipmentModel")
const { object, string } = require("zod")
const EQUIPMENT_FUNCTIONS = require('../functions/EquipmentFunctions')

class EQUIPMENT_CONTROLLER {
  REGISTER_EQUIPMENT = async(REQ, RES) => {
    const VALID_DATA = await EQUIPMENT_FUNCTIONS.VALIDATION_DATA(REQ, RES)
    if(!VALID_DATA){
      RES.status(400).json({ msg: "ERROR" })
    }else{
      RES.status(201).json({ msg: "SUCESS" })      
    }
  }
}

module.exports = EQUIPMENT_CONTROLLER