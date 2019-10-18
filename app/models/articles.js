const mongoose = require('mongoose')

const { Schema, model } = mongoose

const articleSchema = new Schema({
    __v: { type: Number, select: false },
    keyword: {type: String, select: true },
    title: { type: String, select: true },
    description: { type: String, select: true},
    time: { type: String, select: true},
    cover: { type: String, select: true},
    fullText: { type: String, select: false }
})

module.exports = model('Article', articleSchema)