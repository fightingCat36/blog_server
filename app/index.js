const Koa = require('koa')
const mongoose = require('mongoose')
const error = require('koa-json-error')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')

const Logger = require('./util')
const { connectUrl } = require('./config')

const app = new Koa()

// 链接数据库
mongoose.connect(connectUrl, () => {
    Logger.log('connection success!')
})

mongoose.connection.on('error', (err) => {
    Logger.error(err)
})

// 生产环境报错屏蔽堆栈信息
app.use(error({
    postFormat: (error, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))

app.use(koaBody())

// 可以解析路由参数
app.use(parameter(app))

app.listen(3000, () => {
    Logger.log('program is running at port 3000!')
})