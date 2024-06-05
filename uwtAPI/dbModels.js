// TODO: documentar
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
    averageRate: {
        type: Number,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    verificationCode: {
        type: String,
        default: ''
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

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

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
    pic: {
        type: String
    },
    averageRate: {
        type: Number,
        default: 0
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
})

const User = mongoose.model('User', userSchema)

const Publication = mongoose.model('Publication', publiSchema)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { User, Publication, Comment }