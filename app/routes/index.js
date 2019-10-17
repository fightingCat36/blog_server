const fs = require('fs')

module.exports = app => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file = 'index.js') {
            return
        }
        const router = require(`./${file}`)
        // allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头
        app.use(router.routes()).use(router.allowMethods())
    })
}