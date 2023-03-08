const express = require('express');
const db = require('./queries');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

const login = require('./controller/login');
const auth = require('./middleware/authjwt.js');
const authJwt = require('./middleware/authjwt.js');

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

app.get('/users', db.getUsers, [authJwt.verifyToken])
app.get('/users/:id', db.getUserById,[authJwt.verifyToken])
app.post('/users', [authJwt.verifyToken, authJwt.isAdmin], db.createUser)
app.put('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], db.updateUser)
app.delete('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], db.deleteUser)
app.post('/login', login.Login)





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})