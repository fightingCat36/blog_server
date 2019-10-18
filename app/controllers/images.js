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

    // 新增一张图片
    async create (ctx) {
        ctx.verifyParams({
            description: { type: 'string', required: true },
            cover: { type: 'string', require: true }
        })
        const { cover } = ctx.request.body
        // 校验用户是否存在
        const requestImage = await Image.findOne({ cover })
        if (requestImage) {
            // 409代表冲突
            ctx.throw(409, 'Image exists!!')
        }
        const image = await new Image(ctx.request.body).save()
        ctx.body = image
    }

    // 修改一张图片
    async update (ctx) {
        ctx.verifyParams({
            description: { type: 'string', required: false},
            cover: { type: 'string', require: false}
        })

        const image = await Image.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!image) {
            ctx.throw(404, 'Image does not exist!!')
        }
        ctx.body = image
    }

    // 通过id删除一张图片
    async deleteById (ctx) {
        const image = await Image.findByIdAndRemove(ctx.params.id)
        if (!image) {
            ctx.throw(404, 'Image does not exist!!')
        }
        ctx.status = 204
    }
}

module.exports = new ImagesCtl()