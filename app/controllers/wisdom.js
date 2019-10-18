const Wisdom = require('../models/wisdoms')

class WisdomCtl {
    async find (ctx) {
        const { per_page = 4 } = ctx.query
        // 第几页
        const page = Math.max(0, ctx.query.page * 1 - 1)
        // 每页多少项
        const perPage = Math.max(1, per_page * 1)
        ctx.body = await Wisdom.find().limit(perPage).skip(page * perPage)
    }

     // 新增一条感悟
     async create (ctx) {
        ctx.verifyParams({
            topic: { type: 'string', required: true }
        })
        const { topic } = ctx.request.body
        // 校验用户是否存在
        const requestWisdom = await Wisdom.findOne({ topic })
        if (requestWisdom) {
            // 409代表冲突
            ctx.throw(409, 'Wisdom exists!!')
        }
        const wisdom = await new Wisdom(ctx.request.body).save()
        ctx.body = wisdom
    }

    // 修改一条感悟
    async update (ctx) {
        ctx.verifyParams({
            topic: { type: 'string', required: true}
        })

        const wisdom = await Wisdom.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!wisdom) {
            ctx.throw(404, 'Wisdom does not exist!!')
        }
        ctx.body = wisdom
    }

    // 通过id删除一条感悟
    async deleteById (ctx) {
        const wisdom = await Wisdom.findByIdAndRemove(ctx.params.id)
        if (!wisdom) {
            ctx.throw(404, 'Wisdom does not exist!!')
        }
        ctx.status = 204
    }
}

module.exports = new ArticlesCtl()