const router = require('koa-router')()
const service = require ("../utils/mysql")
const controller = require("../controller/userController")

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// router.prefix('/accounts')
router.post("login","/accounts/signup",controller.checkLogin)
router.post("login","/accounts/register",controller.registerUser)

module.exports = router
