const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    expires: Date,
    session: String
})
const Session = mongoose.model('session', sessionSchema)

module.exports = Session