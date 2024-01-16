const EXPRESS = require("express")
const ROUTER = EXPRESS.Router()
const MIDDLEWARES = require("../middleware/Middleware")
const USER = require("../controllers/UserController")

const MIDDLEWARE = new MIDDLEWARES()
const USER_CONTROLLER = new USER()

ROUTER.post(
  '/register',
  USER_CONTROLLER.USER_REGISTER
)

ROUTER.post(
  '/login',
  USER_CONTROLLER.USER_LOGIN
)

module.exports = ROUTER