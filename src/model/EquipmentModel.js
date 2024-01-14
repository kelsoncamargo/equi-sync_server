const  MONGOOSE = require("mongoose")

const EQUIPMENTS = MONGOOSE.model("equipment", {
  routers: [
    {
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
    }
  ],
  switchs: [
    {
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
    }
  ],
  olts: [
    {
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
    }
  ],
})

module.exports = EQUIPMENTS 