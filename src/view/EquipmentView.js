const EXPRESS = require("express")
const ROUTER = EXPRESS.Router()
const MIDDLEWARES = require("../middleware/Middleware")
const EQUIPMENT = require("../controllers/EquipmentControllers")

const MIDDLEWARE = new MIDDLEWARES()
const EQUIPMENT_CONTROLLER = new EQUIPMENT()

ROUTER.post(
  '/register/:id',
  MIDDLEWARE.CHECK_TOKEN_AND_ID,
  MIDDLEWARE.VALIDATIONS_TOKEN_BANLIST, 
  EQUIPMENT_CONTROLLER.REGISTER_EQUIPMENT
)

module.exports = ROUTER