const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router({ prefix: '/images' })
const { secret }= require('../config')
const { find, findById  } = require('../controllers/images')

const auth = jwt({ secret })


// 获取图片列表
router.get('/', find)

module.exports = router
