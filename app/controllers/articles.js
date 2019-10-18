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
            ctx.throw(404, 'Article not exsit!!')
        }
        ctx.body = article
    }
}

module.exports = new ArticlesCtl()