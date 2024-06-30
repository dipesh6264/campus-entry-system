const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    input: {
        type: String,
    },
    result: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Code', CodeSchema);
