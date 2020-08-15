const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: String,
    text: String,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('Message', messageSchema);