const  MONGOOSE = require("mongoose")

/** 
 * EQUIPMENT MODEL
 * Defines the equipment data structure, includes equipment_name, type, model, 
 * version, address, telnet_port, snmp_port, snmp_community, username, password.
 * @property {String} name_equipment - The equipment name
 * @property {String} type - If the equipment is @router @switch or @olt
 * @property {String} model - The equipment model
 * @property {String} version - The equipment version
 * @property {String} address - The IP address  equipment
 * @property {String} telnet_port - The port number from equipment to telnet acess
 * @property {String} snmp_port - The port number for read information of the equipmento between snmp
 * @property {String} username - User for equipment acess between telnet
 * @property {String} password - Password for equipment acess between telnet
 * 
 */
const EQUIPMENT_SCHEMA = new MONGOOSE.Schema({
  name_equipment: String,
  type: String,
  model: String,
  version: String,
  address: String,
  telnet_port: String,
  snmp_port: String,
  snmp_community: String,
  username: String,
  password: String,
})

/** 
 * EQUIPMENT MODEL
 * Defines the equipment model for the user to store equipment
 * @property {String} routers - Is the array of the routers 
 * @property {String} switches - Is the array of the switches
 * @property {String} olts - Is the array of the olts 
 * 
 */
const EQUIPMENTS = MONGOOSE.model("equipment", {
  routers: [EQUIPMENT_SCHEMA],
  switches: [EQUIPMENT_SCHEMA],
  olts: [EQUIPMENT_SCHEMA],
})

module.exports = EQUIPMENTS 