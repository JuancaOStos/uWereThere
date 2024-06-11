// TODO: limpiar profundo
// TODO: quitar endpoints innecesarios
// TODO: modificar contraseña de la BD
// TODO: reorganizar y normalizar los endpoints
// TODO: documentar
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const lodash = require('lodash')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const { getAllUsers,
        getUserById,
        getUserByEmail,
        validateAccount } = require('./dbHelper.js')

const app = express()
const mongoose = require('mongoose')
const { User, Publication, Comment } = require('./dbModels.js')
const multer = require('multer')
const { URL, MAILTRAP_USERNAME, MAILTRAP_PASSWORD, APP_PASSWORD } = require('../uwtUI/constants.js')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "uwerethereservices@gmail.com",
      pass: APP_PASSWORD,
    },
  });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })



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

        if (match && existingUser.verified) {
            const token = jwt.sign({
                _id: existingUser._id,
                exp: new Date().getDate() + DAY_IN_SEC

            }, SWORD)
            res.send({
                status: 'ok',
                result: 'User logged with success',
                token: token
            })
        } else {
            if (!match) {
                console.error('Password doesn\'t match')
                res.send({
                    status: 'error',
                    result: 'Password doesn\'t match'
                })
            }
            if (!existingUser.verified) {
                console.error('User not verified')
                res.send({
                    status: 'error',
                    result: 'User not verified'
                })
            }
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

app.post('/userByEmail', async (req, res) => {
    const { email } = req.body
    
    await User.findOne({ email: email })
        .then(user => {
            if(user) {
                res.send({
                    result: user
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

app.post('/authUserById', async (req, res) => {
    const { _id } = req.body
    
    await User.findById(_id, '-password -publications -followed -followers -verificationCode')
        .then(user => {
            if(user) {
                res.send({
                    result: user
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

app.post('/checkFollowedById', async (req, res) => {
    const { authId, followedId } = req.body
    let authFollowed
    if (authId) {
        await User.findById(authId, 'followed')
            .then(data => {
                console.log(data)
                authFollowed = data.followed
                const isFollowed = (authFollowed.includes(followedId))
                    ? true
                    : false
                res.send({
                    result: isFollowed
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

app.post('/getFollowedAndFollowersById', async (req, res) => {
    const { authId } = req.body

    await User.findById(authId, 'followed followers').populate([
        { path: 'followed', select: '-password' },
        { path: 'followers', select: '-password' },
    ])
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

app.put('/changeNickname', async (req, res) => {
    const { _id, newNickname } = req.body
    
    await User.findByIdAndUpdate(_id, {
        $set: {
            nickname: newNickname
        }
    })
        .then(() => {
            res.send({
                status: 'ok',
                result: 'User nickname changed successfully'
            })
        })
        .catch(err => {
            console.error('An error has occurred changing nickname:\n' + err)
        })
})

app.put('/changePassword', async (req, res) => {
    const { _id, password, newPassword } = req.body
    
    const storedPassword = await User.findById(_id, 'password')
        .catch(err => {
            console.error('An error has occurred finding user:\n' + err)
        })
    
    if (storedPassword) {
        const match = await bcrypt.compare(password, storedPassword.password)
        console.error('Mostrar match:', match)
        if (match) {
            const encodedNewPassword = await bcrypt.hash(newPassword, SALT)
                .catch(err => {
                    console.error('An error has occurred during password encrypting\n' + err)
                    return res.send({
                        status: 'error',
                        result: 'An error has occurred during signup'
                    })
                })
            
            if (encodedNewPassword) {
                await User.findByIdAndUpdate(_id, {
                    $set: {
                        password: encodedNewPassword
                    }
                })
                    .then(() => {
                        console.log('User password changed successfully')
                        res.send({
                            status: 'ok',
                            result: 'User password changed successfully'
                        })
                    })
                    .catch(err => {
                        console.error('Error changing password\n:' + err)
                        res.send({
                            status: 'error',
                            result: 'Error changing password\n:' + err
                        })
                    })
            }

        } else {
            console.error('The password doesn\'t match')
            res.send({
                status: 'error',
                result: 'The password doesn\'t match'
            })
        }
    } else {
        console.error('User not found')
        res.send({
            status: 'error',
            result: 'User not found'
        })
    }
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
    const { authId, followedId } = req.body
    
    try {
        await Promise.all([
            User.findByIdAndUpdate(authId, {
                $push: {
                    followed: followedId
                }
            }),
            User.findByIdAndUpdate(followedId, {
                $push: {
                    followers: authId
                }
            })
        ])

        console.log('Followers and followed updated successfully')
        res.send({
            status: 'ok',
            result: 'New followed added'
        })
    } catch (err) {
        console.error('An error has occurred during user updating:\n' + err)
        res.status(500).send({
            status: 'error',
            result: 'An error has occurred during user updating'
        })
    }
})

app.put('/unFollowUser', async (req, res) => {
    const { authId, followedId } = req.body
    
    try {
        await Promise.all([
            User.findByIdAndUpdate(authId, {
                $pull: {
                    followed: followedId
                }
            }),
            User.findByIdAndUpdate(followedId, {
                $pull: {
                    followers: authId
                }
            })
        ])
        
        console.log('Followers and followed updated successfully')
        res.send({
            status: 'ok',
            result: 'User unfollowed'
        })
    } catch(err) {
        console.error('An error has occurred during user updating:\n' + err)
        res.status(500).send({
            status: 'error',
            result: 'An error has occurred during user updating'
        })
    }
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
        verified: false,
        verificationCode: '',
        publications: [],
        followed: [],
        followers: []
    })
        .then(() => {
            console.log('User created with success')
            res.send({
                status: 'ok',
                result: 'User created with success'
            })
        })
        .catch(err => {
            console.log('An error has occurred during signup:\n' + err)
            res.send({
                status: 'error',
                result: 'An error has occurred during signup:\n' + err
            })
        })
})

app.post('/verificationCode', async (req, res) => {
    const { email } = req.body
    console.log('Checking email: ' + email)
    const max = 9999
    const min = 1000
    const randomCode = (Math.round(Math.random() * (max - min) + min)).toString()
    console.log(randomCode)
    const encodedCode = await bcrypt.hash(randomCode, SALT)
    console.log(await bcrypt.compare(randomCode, encodedCode))
    transporter.sendMail({
        from: '"Verify your email" <jcostosmolina@gmail.com>',
        to: email,
        subject: 'Verify your email',
        html: `<h1>Verify your email</h1><p>Your verification code is <b>${randomCode}</b></p>`
    })
        .then(() => console.log('email send with success'))
        .catch(err => console.error('Error sending emil: ' + err))
    const updatedUser = await User.findOneAndUpdate({
        email: email
    }, {
        $set: {
            verificationCode: encodedCode
        }
    })
    if (updatedUser) {
        res.send({
            result: 'Verification code set'
        })
    } else {
        res.send({
            result: 'Error setting a verification code'
        })
    }
})

app.post('/verifyCode', async (req, res) => {
    const { email, code } = req.body
    const user = await User.findOne({
        email: email
    })
    if (user) {
        const match = await bcrypt.compare(code ,user.verificationCode)
        if (match) {
            await User.findByIdAndUpdate(user._id, {
                $set: {
                    verified: true
                }
            })
                .then(() => {
                    console.log('User verify with success')
                })
                .catch(err => {
                    console.error('Error:', err)
                })
            res.send({
                status: 'ok',
                result: 'User verified with success'
            })
        } else {
            console.error('The code doesn\'t match')
            res.send({
                status: 'error',
                result: 'The code doesn\'t match'
            })
        }
    }
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