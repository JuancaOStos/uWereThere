const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { getAllUsers,
        getUserById,
        getUserByEmail,
        validateAccount } = require('./dbHelper.js')

const app = express()
const mongoose = require('mongoose')
const { User } = require('./dbModels.js')

const DATABASE = 'uwtDevDB'
const USERNAME = 'jcostosmolina'
const PASSWORD = 'Kyaromir-9'
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@uwtcluster.8fbaqsw.mongodb.net/${DATABASE}?retryWrites=true&w=majority&appName=uwtCluster`

const SALT = 10
const SWORD = 'tSZEMEBNRsVWMYt2dnyjqaoiFS5VhOXI'

const DAY_IN_SEC = 86400

mongoose.connect(URI)
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.error('An error has occurred connecting MongoDB:\n' + err)
    })

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome home!'})
})

app.get('/users', async (req, res) => {
    const users = await User.find()
    if (users.length === 0) {
         return res.json({
            status: 'Bad',
            result: null
        })
    }
    res.json({
        status: 'Ok',
        result: users
    })

})

app.get('/users/email/:email', async (req, res) => {
    const { email } = req.params
    getUserByEmail(email)
        .then(data => res.json(data))
    
})

app.get('/users/id/:id', async (req, res) => {
    const { id } = req.params
    getUserById(id)
        .then(data => res.json(data))
        .catch((err) => {
            console.error('An error has occurred:\n' + err)
            res.status(404).json({ message: 'An error has occurred' })
        })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    // console.log('Lo muestro', email, password)

    const existingUser = await User.findOne({ email: email })
        .catch(() => {
            res.send({
                token: null
            })
        })
    
    const match = await bcrypt.compare(password, existingUser.password)

    if (match) {
        const token = jwt.sign({
            email: existingUser.email,
            nickname: existingUser.nickname,
            avatar: existingUser.avatar,
            exp: new Date().getDate() + DAY_IN_SEC

        }, SWORD)
        res.send({
            token: token
        })
    }
})

app.post('/users/userByEmail', async (req, res) => {
    const { email } = req.body
    
    await User.findOne({ email: email })
        .then(data => {
            if(data) {
                res.send({
                    result: 'The user already exist'
                })
            } else {
                res.send({
                    result: null
                })
            }
        })
        .catch(err => {
            res.send({
                result: 'An error has occurred finding document:\n' + err
            })
        })
})

app.post('/signup', async (req, res) => {
    const { email, password, nickname, avatar } = req.body
    const encryptedPassword = await bcrypt.hash(password, SALT)
        .catch(err => {
            console.error('An error has occurred during password encrypting\n' + err)
            return res.send({
                result: 'An error has occurred during signup'
            })
        })
    
    await User.create({
        email: email,
        password: encryptedPassword,
        nickname: nickname,
        avatar: avatar
    })
        .then(() => {
            res.send({
                status: 'ok',
                result: 'User created with success'
            })
        })
        .catch(err => {
            res.send({
                status: 'error',
                result: 'An error has occurred during signup:\n' + err
            })
        })
})

app.use((req, res) => {
    res.status(404).json({ message: '404: Not found' })
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})