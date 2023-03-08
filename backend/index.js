const express = require('express')
const db = require('./queries')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({ info: 'CRUD REST api' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})