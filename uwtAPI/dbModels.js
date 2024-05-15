const mongoose = require('mongoose')


// Schema and model of User collection
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema)


module.exports = { User }