const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const lodash = require('lodash')
const bodyParser = require('body-parser')
const { getAllUsers,
        getUserById,
        getUserByEmail,
        validateAccount } = require('./dbHelper.js')

const app = express()
const mongoose = require('mongoose')
const { User, Publication, Comment } = require('./dbModels.js')
const multer = require('multer')
const { URL } = require('../uwtUI/constants.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    const fileUrl = `/public/images/${req.file.filename}`
    res.send({
        url: fileUrl
    })
    // if (req.file) {
    //     console.log(req.file)
    //     res.send({
    //         result: 'Image uploaded successfully', file: req.file
    //     })
    // } else {
    //     res.status(400).send({
    //         result: 'No file uploaded'
    //     })
    // }
})

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
                averageRate: existingUser.averageRate,
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

app.post('/checkFriendById', async (req, res) => {
    const { authId, friendId } = req.body
    let authFriends
    if (authId) {
        await User.findById(authId, 'friends')
            .then(data => {
                authFriends = data.friends
                const isFriend = (authFriends.includes(friendId))
                    ? true
                    : false
                res.send({
                    result: isFriend
                })
            })
            .catch(err => {
                res.send({
                    result: 'An error has occurred finding documenst:\n' + err
                })
            })
        
    } else {
        res.send({
            result: "'_id' param not provided"
        })
    }
})

app.post('/getPublicationsById', async (req, res) => {
    const { authId } = req.body

    await User.findById(authId, 'publications').populate('publications')
        .then(data => {
            res.send({
                result: data
            })
        })
        .catch(err => {
            res.send({
                result: 'An error has occurred:\n' + err
            })
        })
})

app.post('/getFriendsById', async (req, res) => {
    const { authId } = req.body

    await User.findById(authId, 'friends').populate({
        path: 'friends',
        select: '-password'
    })
        .then(data => {
            res.send({
                result: data
            })
        })
        .catch(err => {
            res.send({
                result: 'An error has occurred:\n' + err
            })
        })
})

app.post('/getCommentsById', async (req, res) => {
    const { publicationId } = req.body

    await Publication.findById(publicationId, 'comments').populate({
        path: 'comments',
        options: {
            sort: { 'createdAt': -1 }
        },
        populate: {
            path: 'author',
            select: 'nickname avatar'
        }
    })
    // .sort({ 'comments.createdAt': -1 })
    .then(data => {
            res.send({
                result: data
            })
        })
        .catch(err => {
            res.send({
                result: 'An error has occurred:\n' + err
            })
        })
})

app.put('/addNewComment', async (req, res) => {
    const { publicationId, authId, comment } = req.body

    const newComment = {
        author: authId,
        comment: comment
    }

    await Comment.create({
        author: authId,
        comment: comment
    })
        .then(async newComment => {
            await Publication.findByIdAndUpdate(publicationId, {
                $push: {
                    comments: newComment._id
                }
            })
                .then(() => {
                    console.log('Publication comments updated with success')
                })
                .catch(err => {
                    console.error('An error has occurred during publication updating')
                })
        })
        .then(() => {
            console.log('Comment created with success')
            res.send({
                result: 'Comment created with success'
            })
        })
        .catch(err => {
            console.error('An error has occurred creating new comment:\n' + err)
            res.send({
                result: 'An error has occurred creating new comment:\n' + err
            })
        })
})

app.put('/followUser', async (req, res) => {
    const { authId, friendId } = req.body
    
    await User.findByIdAndUpdate(authId, {
        $push: {
            friends: friendId
        }
    })
        .then(() => {
            console.log('User friends updated succesfully')
            res.send({
                result: 'New friend added'
            })
        })
        .catch(err => {
            console.error('An error has occurred during user friends updating:\n' + err)
            res.send({
                result: 'An error has occurred during user friends updating:\n' + err
            })
        })

})

app.put('/unFollowUser', async (req, res) => {
    const { authId, friendId } = req.body
    
    await User.findByIdAndUpdate(authId, {
        $pull: {
            friends: friendId
        }
    })
        .then(() => {
            console.log('User friends updated succesfully')
            res.send({
                result: 'Friend unfollowed'
            })
        })
        .catch(err => {
            console.error('An error has occurred during user friends updating:\n' + err)
            res.send({
                result: 'An error has occurred during user friends updating:\n' + err
            })
        })

})

app.post('/signup', async (req, res) => {
    const { email, password, nickname, avatar } = req.body
    console.log(email)
    console.log(password)
    console.log(nickname)
    console.log(avatar)
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
        avatar: avatar,
        averageRate: 0,
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

app.post('/addRate', async (req, res) => {
    const { publicationId, author, rate } = req.body

    const publicationRates = await Publication.findById(publicationId, 'rates')
    console.log(publicationRates)
    if (publicationRates.rates) {
        const authors = publicationRates.rates.map(rateItem => rateItem.author.toString())
        console.log(authors)
        console.log(authors.includes(author))
        if (!authors.includes(author)) {
            // create
            console.log('create')
            const newRate = {
                author: author,
                rate: rate
            }
            await Publication.findByIdAndUpdate(publicationId, {
                $push: {
                    rates: newRate
                }
            })
                .then(() => {
                    console.log('New rate added')
                })
                .catch(err => {
                    res.send({
                        result: 'An error has occurred adding new rate:\n' + err
                    })
                })
        } else {
            // update
            console.log('update')
            await Publication.findOneAndUpdate({
                _id: publicationId,
                'rates.author': author
            }, {
                $set: { 'rates.$.rate': rate }
            })
                .then(() => {
                    console.log('Rate updated')
                })
                .catch(err => {
                    res.send({
                        result: 'An error as occurred updating the rate\n:' + err
                    })
                })
        }
        const allRates = await Publication.findById(publicationId, 'rates')
        console.log('PUNTUACIONES: ' + allRates.rates)
        const ratePoints = allRates.rates.map(rateItem => rateItem.rate)
        console.log(ratePoints)
        const averageRate = Math.round(lodash.mean(ratePoints) * 10) / 10
        console.log(averageRate)
        await Publication.findByIdAndUpdate(publicationId, {
            averageRate: averageRate
        })
            .then(async publicationUpdated => {
                await User.findById(publicationUpdated.author)
                    .then(async author => {
                        console.log(author)
                        const authorPublications = await Publication.find({
                            author,
                            averageRate: { $gt: 0 }
                        }, 'averageRate')
                        console.log('Publicaciones pobladas del usuario')
                        console.log(authorPublications)
                        const publicationRates = authorPublications.map(publication => publication.averageRate)
                        console.log(publicationRates)
                        const authorAverageRate = Math.round(lodash.mean(publicationRates) * 10) / 10
                        console.log(authorAverageRate)
                        const result = await User.findOneAndUpdate(author._id, {
                            $set: {
                                averageRate: authorAverageRate
                            }
                        })
                            .then(() => {
                                console.log('User averageRate updated with success')
                            })
                            .catch(err => {
                                console.error('An error has occurred updating user averageRate')
                            })
                        if (result) {
                            res.send({
                                result: 'Publication rated with success'
                            })
                        }
                    })
            })

        res.send({
            result: 'Publication rated successfully'
        })
    } else {
        res.send({
            result: 'Publication not rated'
        })
    }

})

app.post('/addNewPublication', async (req, res) => {
    const { location, pic, title, description, author } = req.body
    console.log(
        location,
        title,
        description,
        pic,
        author
    )
    await Publication.create({
        location: location,
        title: title,
        description: description,
        pic: pic,
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

app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')))

app.use((req, res) => {
    res.status(404).json({ message: '404: Not found' })
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})