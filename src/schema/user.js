const { Schema, model } = require("mongoose");

const user = new Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    redeemedBy: {
        type: String,
        default: null
    },
    redeemedAt: {
        type: Number,
        default: null
    },
    plan: {
        type: String,
        default: null
    },
    expireTime: {
        type: Number,
        default: null
    },
    expireAt: {
        type: Date,
        default: null
    }
})

module.exports = model('user', user);