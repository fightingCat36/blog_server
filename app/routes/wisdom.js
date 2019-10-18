const Router = require('koa-router')
const jwt = require('koa-jwt')

const router = new Router({ prefix: '/wisdom' })
const { secret }= require('../config')
const { find, create, update, deleteById } = require('../controllers/wisdom')

const auth = jwt({ secret })


// 获取名言警句列表
router.get('/', find)

// 新增一条感受
router.post('/', create)

// 局部替换更新 patch, put是所有都替换
router.patch('/:id', update)

router.delete('/:id', deleteById)

module.exports = router
