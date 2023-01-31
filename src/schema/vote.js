const { Schema, model } = require("mongoose");

const vote = new Schema({
    Id: {
        type: String,
        required: true,
        unique: true
    },
    expireTime: {
        type: Number,
        default: null
    },
});

module.exports = model('vote', vote);