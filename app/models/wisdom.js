const mongoose = require('mongoose')

const { Schema, model } = mongoose

const wisdomSchema = new Schema({
    __v: { type: Number, select: false },
    topic: { type: String, select: true}
})

module.exports = model('Wisdom', wisdomSchema)