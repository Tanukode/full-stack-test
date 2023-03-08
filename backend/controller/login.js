const dotenv = require('dotenv');

const Pool = require('pg').Pool;
dotenv.config();

const config = require("../middleware/auth.config");

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.Login = async (req, res) => {
    const { email, password } = req.body;

    var user;
    var roles;

    const getUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    user = getUser.rows[0];

    if (!user) {
        return res.status(404).send({ message: "Usuario no Encontrado" });
    }

    var isPasswordValid = false;
    if (req.body.password === user.password) isPasswordValid = true;

    if (!isPasswordValid) {
        return res.status(401).send({
            accessToken: null,
            message: "invalid password"
        })
    }
    const getRoles = await pool.query("SELECT id_usuario, id_perfil FROM roles_usuarios WHERE id_usuario = $1", [user.id]);

    roles = [];

    for (let item of getRoles.rows) {
        roles.push(item.id_perfil);
        console.log(item.id_perfil);
    }


    console.log(roles);
    var token = jwt.sign({ id: user.id, roles: roles }, config.secret, {
        expiresIn: 86400
    })

    if (!roles) {
        res.status(403).send({ message: "forbidden" });
    }

    res.status(200).send({
        id: user.id,
        username: user.nombre_usuario,
        email: user.email,
        roles: roles,
        accessToken: token
    });
};

