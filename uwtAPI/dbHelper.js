const mongoose = require('mongoose')
const { User } = require('./dbModels.js')

const DATABASE = 'uwtDevDB'
const USERNAME = 'jcostosmolina'
const PASSWORD = 'Kyaromir-9'
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@uwtcluster.8fbaqsw.mongodb.net/${DATABASE}?retryWrites=true&w=majority&appName=uwtCluster`

// Connection to DB
async function connectToDB() {
    await mongoose.connect(URI)
}

// Get all users
async function getAllUsers() {
    let data
    await connectToDB()
        .then(async () => data = await User.find())
        .catch(err => console.error('An error has occurred:\n' + err))
    return data
}

// Get user by id
async function getUserById(id) {
    let data
    await connectToDB()
        .then(async () => data = await User.find({ _id: id}))
        .catch(err => console.error('An error has occurred:\n' + err))
    return data
}

// Get user by email
async function getUserByEmail(email) {
    let data
    await connectToDB()
        .then(async () => data = await User.find({ email: email }))
        .catch(err => console.error('An error has occurred:\n' + err))
    return data
}

module.exports = {
    connectToDB,
    getAllUsers,
    getUserById,
    getUserByEmail
}