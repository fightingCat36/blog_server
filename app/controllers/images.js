const Image = require('../models/Images')

class ImagesCtl {
    async find (ctx) {
        const { per_page = 25 } = ctx.query
        // 第几页
        const page = Math.max(0, ctx.query.page * 1 - 1)
        // 每页多少项
        const perPage = Math.max(1, per_page * 1)
        ctx.body = await Image.find().limit(perPage).skip(page * perPage)
    }
}

module.exports = new ImagesCtl()