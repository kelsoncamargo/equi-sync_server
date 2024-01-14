require('dotenv').config()
const EXPRESS = require("express")
const MONGOOSE = require("mongoose")

const APP = EXPRESS()
const HTTP_PORT = 3000
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

APP.use(EXPRESS.json())
// APP.use('/user', USER_ROUTER)

MONGOOSE.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@equip-sync.c22vswy.mongodb.net/?retryWrites=true&w=majority/equip-sync`
).then(() => {
  console.log("CONNECTED IN DATABASE")
}).catch( err => console.log(err))

APP.listen(HTTP_PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${HTTP_PORT}`)
})