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

ROUTER.post('/user-logout/:id', MIDDLEWARE.CHECK_TOKEN_AND_ID, MIDDLEWARE.VALIDATIONS_TOKEN_BANLIST, USER_CONTROLLER.USER_LOGOUT)

module.exports = ROUTER