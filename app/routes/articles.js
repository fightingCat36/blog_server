const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router({ prefix: '/articles' })
const { secret }= require('../config')
const { find, findById, create, update, deleteById  } = require('../controllers/articles')

const auth = jwt({ secret })


// 获取文章列表
router.get('/', find)

// 新增一篇文章
router.post('/', create)

// 获取某一篇文章数据
router.get('/:id', findById)

// 局部替换更新 patch, put是所有都替换
router.patch('/:id', update)

router.delete('/:id', deleteById)


module.exports = router
