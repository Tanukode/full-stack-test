const jwt = require("jsonwebtoken");
const config = require("./auth.config")

const dotenv = require('dotenv');

const Pool = require('pg').Pool;
dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "forbidden" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "unauthorized" });
        }

        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    pool.query("SELECT id FROM usuarios WHERE id = $1", [req.userId])
        .then(user => {
            const userId = user.rows[0].id
            pool.query("SELECT id_perfil FROM roles_usuarios WHERE id_usuario = $1", [userId])
                .then(roles => {
                    const userRole = roles.rows
                    for (item of userRole) {
                        if (item.id_perfil === 0) {
                            next();
                            return;
                        }
                    }
                    res.status(403).send({ message: "requiere rol admin" });
                });
        });
}
isAudit = (req, res, next) => {
    pool.query("SELECT id FROM usuarios WHERE id = $1", [req.userId])
        .then(user => {
            const userId = user.rows[0].id
            pool.query("SELECT id_perfil FROM roles_usuarios WHERE id_usuario = $1", [userId])
                .then(roles => {
                    const userRole = roles.rows
                    for (item of userRole) {
                        if (item.id_perfil === 1) {
                            next();
                            return;
                        }
                    }
                    res.status(403).send({ message: "requiere rol audit" });
                });
        });
}
isViewer = (req, res, next) => {
    pool.query("SELECT id FROM usuarios WHERE id = $1", [req.userId])
        .then(user => {
            const userId = user.rows[0].id
            pool.query("SELECT id_perfil FROM roles_usuarios WHERE id_usuario = $1", [userId])
                .then(roles => {
                    const userRole = roles.rows
                    for (item of userRole) {
                        if (item.id_perfil === 2) {
                            next();
                            return;
                        }
                    }
                    res.status(403).send({ message: "requiere rol viewer" });
                });
        });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAudit: isAudit,
    isViewer: isViewer,
};

module.exports = authJwt;




