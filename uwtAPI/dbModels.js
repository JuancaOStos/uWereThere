const mongoose = require('mongoose')


// Schema and model of User collection

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: null
    },
    rate: {
        type: Number,
        required: true
    },
    publications: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication'
        }],
    },
    friends: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})



const publiSchema = new mongoose.Schema({
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    pics: {
        type: String,
        default: null
    },
    rates: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rate: {
            type: Number,
            required: true
        }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
})

const User = mongoose.model('User', userSchema)

const Publication = mongoose.model('Publication', publiSchema)

module.exports = { User, Publication }