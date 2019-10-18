const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router({ prefix: '/wisdom' })
const { secret }= require('../config')
const { find } = require('../controllers/wisdom')

const auth = jwt({ secret })


// 获取名言警句列表
router.get('/', find)

module.exports = router
