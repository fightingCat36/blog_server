const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router({ prefix: '/articles' })
const { secret }= require('../config')
const { find, findById  } = require('../controllers/articles')

const auth = jwt({ secret })


// 获取文章列表
router.get('/', find)

// 获取某一篇文章数据
router.get('/:id', findById)

module.exports = router
