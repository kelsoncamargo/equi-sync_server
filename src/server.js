require('dotenv').config()
const EXPRESS = require("express")
const MONGOOSE = require("mongoose")
const USER_VIEW = require("./view/UserView")
const EQUIPMENT_VIEW = require("./view/EquipmentView")

const APP = EXPRESS()
const HTTP_PORT = 3000
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

APP.use(EXPRESS.json())
APP.use('/user', USER_VIEW)
APP.use('/equipment', EQUIPMENT_VIEW)

MONGOOSE.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@equip-sync.c22vswy.mongodb.net/equip-sync?retryWrites=true&w=majority`
).then(() => {
  console.log("CONNECTED IN DATABASE")
}).catch( err => console.log(err))

APP.listen(HTTP_PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${HTTP_PORT}`)
})