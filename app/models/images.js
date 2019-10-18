const mongoose = require('mongoose')

const { Schema, model } = mongoose

const imageSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, select: true},
    cover: { type: String, select: true}
})

module.exports = model('Image', imageSchema)