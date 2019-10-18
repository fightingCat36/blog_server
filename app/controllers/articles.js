const Article = require('../models/articles')

class ArticlesCtl {
    async find (ctx) {
        const { per_page = 7 } = ctx.query
        // 第几页
        const page = Math.max(0, ctx.query.page * 1 - 1)
        // 每页多少项
        const perPage = Math.max(1, per_page * 1)
        ctx.body = await Article.find({keyword: new RegExp(ctx.query.q)}).limit(perPage).skip(page * perPage)
    }

    async findById (ctx) {
        const { fields = '' } = ctx.query
        const selectFields = fields.split(';').filter(item => item).map(item => ` +${item}`).join('')
        const article = await User.findById(ctx.params.id).select(selectFields).populate('fullText')
        if (!article) {
            ctx.throw(404, 'Article does not exsit!!')
        }
        ctx.body = article
    }

    // 新建一篇文章
    async create (ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            fullText: { type: 'string', require: true }
        })
        const article = await new Article(ctx.request.body).save()
        ctx.body = article
    }

    // 修改一篇文章
    async update (ctx) {
        ctx.verifyParams({
            keyword: {type: 'string', required: false },
            title: { type: 'string', required: false  },
            description: { type: 'string', required: false },
            cover: { type: 'string', required: false },
            fullText: { type: 'string', required: false }
        })

        const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!article) {
            ctx.throw(404, 'Article does not exist!!')
        }
        ctx.body = article
    }

    // 通过id删除一篇文章
    async deleteById (ctx) {
        const article = await Article.findByIdAndRemove(ctx.params.id)
        if (!article) {
            ctx.throw(404, 'Article does not exist!!')
        }
        ctx.status = 204
    }
}

module.exports = new ArticlesCtl()