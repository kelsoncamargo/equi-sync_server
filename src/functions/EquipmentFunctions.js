const USER_MODEL = require("../model/UserModel")
const EQUIPMENT_MODEL = require("../model/EquipmentModel")
const { object, string } = require("zod")

const EQUIPMENT_FUNCTIONS = {
  /**
  * Searches in @USER database for the value and returns if it hears something like it
  * @param {String} IN_EMAIL - The request String.
  */
  VALIDATION_DATA: async(REQ, RES) => {
    const {
      NAME_EQUIPMENT,
      SCRIPT_BACKUP, 
      TYPE_EQUIPMENT, 
      MODEL, 
      VERSION, 
      ADDRESS, 
      TELNET_PORT,
      SNMP_COMMUNITY,
      SNMP_PORT,
      USERNAME,
      PASSWORD
    } = REQ.body
    const ID = REQ.params.id
    const USER = await USER_MODEL.findById(ID)
    const EQUIPMENT = await EQUIPMENT_MODEL.findById(USER.equipments)
    const { routers, switches, olts} = EQUIPMENT

    console.log(routers, switches, olts)
    
    return true
    // const USER_SCHEMA = this.ZOD_OBJECT({
    //   NAME_EQUIPMENT: this.ZOD_STRING().min(2).max(255).refine(NAME_EQUIPMENT => {
        
    //   },{msg: 'THE NAME ALREADY IN USE BY ANOTHER EQUIPMENT'}),
    //   SCRIPT_BACKUP: this.ZOD_STRING().min(2).max(255),
    //   TYPE_EQUIPMENT: this.ZOD_STRING().min(2).max(255),
    //   MODEL: this.ZOD_STRING().min(6),
    //   VERSION: this.ZOD_STRING().min(6),
    //   ADDRESS: this.ZOD_STRING().min(6),
    //   TELNET_PORT: this.ZOD_STRING().min(2),
    //   SNMP_COMMUNITY: this.ZOD_STRING().min(5),
    //   SNMP_PORT: this.ZOD_STRING().min(2),
    //   USERNAME: this.ZOD_STRING().min(5),
    //   PASSWORD: this.ZOD_STRING().min(6),
    // })  
  }
}

module.exports = EQUIPMENT_FUNCTIONS