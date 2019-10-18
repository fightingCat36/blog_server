const mongoose = require('mongoose')

const { Schema, model } = mongoose

const articleSchema = new Schema({
    __v: { type: Number, select: false },
    keyword: {type: String, select: true },
    title: { type: String, select: true, required: true },
    description: { type: String, select: true},
    cover: { type: String, select: true},
    fullText: { type: String, select: false, required: true }
}, { timestamps: true })

module.exports = model('Article', articleSchema)