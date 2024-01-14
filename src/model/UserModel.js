const MONGOOSE = require("mongoose")

const USER = MONGOOSE.model("user", {
  name: String,
  last_name: String,
  email: String,
  password: String,
  phone: String,
  document_id: String,
  company_name: String,
  equipments: String,
  white_token: String,
  black_token: String
})

module.exports = USER