const express = require('express')
const { getAllUsers,
        getUserById,
        getUserByEmail } = require('./dbHelper.js')

const app = express()

app.get('/', (req, res) => {
    res.json({ message: 'Welcome home!'})
})

app.get('/users', async (req, res) => {
    getAllUsers()
        .then(data => res.json(data))
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

app.use((req, res) => {
    res.status(404).json({ message: '404: Not found' })
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})