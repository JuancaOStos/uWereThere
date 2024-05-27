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
const { User, Publication } = require('./dbModels.js')

const DATABASE = 'uwtDevDB'
const USERNAME = 'jcostosmolina'
const PASSWORD = 'Kyaromir-9'
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@uwtcluster.8fbaqsw.mongodb.net/${DATABASE}?retryWrites=true&w=majority&appName=uwtCluster`

const SALT = 10
const SWORD = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe"

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
    console.log(existingUser)
    if (existingUser) {
        const match = await bcrypt.compare(password, existingUser.password)

        if (match) {
            const token = jwt.sign({
                _id: existingUser._id,
                email: existingUser.email,
                nickname: existingUser.nickname,
                avatar: existingUser.avatar,
                exp: new Date().getDate() + DAY_IN_SEC

            }, SWORD)
            res.send({
                token: token
            })
        } else {
            res.send({
                result: null
            })
        }
    } else {
        res.send({
            result: null
        })
    }
    
})

app.post('/users/existingEmail', async (req, res) => {
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

app.post('/users/userByEmail', async (req, res) => {
    const { email } = req.body
    
    await User.findOne({ email: email })
        .then(data => {
            if(data) {
                res.send({
                    result: data
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

app.get('/getAllUsers', async (req, res) => {
    await User.find({}, { password: 0 })
        .then(data => {
            if(data) {
                res.send({
                    result: data
                })
            } else {
                res.send({
                    result: null
                })
            }
        })
        .catch(err => {
            res.send({
                result: 'An error has occurred finding documents:\n' + err
            })
        })
})

app.get('/getAllLocations', async (req, res) => {
    await Publication.find({}).populate('author')
        .then(data => {
            if(data) {
                res.send({
                    result: data
                })
            } else {
                res.send({
                    result: null
                })
            }
        })
        .catch(err => {
            res.send({
                result: 'An error has occurred finding documenst:\n' + err
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
        rate: 0,
        publications: [],
        friends: []
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

app.post('/addNewPublication', async (req, res) => {
    const { location, title, description, author } = req.body
    console.log(
        location,
        title,
        description,
        author
    )
    await Publication.create({
        location: location,
        title: title,
        description: description,
        author: author,
        rates: [],
        comments: []
    })
    .then(async (newPublication) => {
        await User.findByIdAndUpdate(author, {
            $push: {
                publications: newPublication._id
            }
        })
            .then(() => {
                console.log('User publications updated succesfully')
            })
            .catch(err => {
                console.error('An error has occurred during user publications updating:\n' + err)
            })
        res.send({
            status: 'ok',
            result: 'Publication created with success'
        })
    })
    .catch(err => {
        res.send({
            status: 'error',
            result: 'An error has occurred during publication creation:\n' + err
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