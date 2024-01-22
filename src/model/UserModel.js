const MONGOOSE = require("mongoose")

/**
 * User Schema
 * Defines the structure of user data, including name, surname, email, password, phone, document ID, company name, equipments, white token, and black token.
 * @property {String} name - The user's name.
 * @property {String} last_name - The user's surname.
 * @property {String} email - The user's email.
 * @property {String} password - The user's password.
 * @property {String} phone - The user's phone number.
 * @property {String} document_id - The user's document ID.
 * @property {String} company_name - The name of the user's company.
 * @property {String} equipments - A string representing the user's equipment.
 * @property {String} white_token - The user's white token.
 * @property {String} black_token - The user's black token.
 */
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