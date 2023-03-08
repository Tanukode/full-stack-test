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
//read all
const getUsers = (req, res) => {
    pool.query('SELECT * FROM usuarios', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}
//read one
const getUserById = (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM usuarios WHERE id = $1;', [id], (error, results) => {
        if (error) throw error;    
        res.status(200).json(results.rows)
    });
}
//create
const createUser = (req, res) => {
    const { nombreCompleto, email, password } = req.body;

    pool.query('INSERT INTO usuarios (nombre_completo, email, password) VALUES ($1,$2,$3) RETURNING *',
        [nombreCompleto, email, password], (error, results) => {
            if (error) throw error;
            res.status(201).send("Usuario añadido con id: ${results.rows[0].id}");
        })
}
//update
const updateUser = (req, res) => {
    const id = req.params.id;
    const { nombreCompleto, email, password } = req.body;

    pool.query(
        'UPDATE usuarios SET nombre_completo = $1, email = $2, password = $3 WHERE id = $4',
        [nombreCompleto, email, password, id], (error, results) => {
            if (error) throw error;
            res.status(200).send('Usuario con id ${id} modificado');
        }
    )
}
//delete
const deleteUser = (req, res) => {
    const id = req.params.id;
    pool.query(
        'DELETE FROM \"usuarios\" WHERE ((\"id\" = $1));', [id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send('done');
        }
    )
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}