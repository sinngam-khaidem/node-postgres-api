import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// CREATE
const createUser = (request, response, next) =>{
    const {name, email} = request.body;

    pool.query(`insert into users (name, email) values ('${name}', '${email}') returning *`, (err, res)=>{
        if(err){
            next(err);
        }
        response.status(201).send(`User added with ID: ${res.rows[0].id}`);
    })
}

// UPDATE
const updateUser = (request, response, next)=>{
    const id = request.params.id;
    const {name, email} = request.body;

    pool.query(
        `update users set name = '${name}', email = '${email}' where id = ${id}`,
        (err, res)=>{
            console.log(`update users set name = '${name}', email = '${email}' where id = ${id}`);
            if(err){
                next(err);
            }
            response.status(200).send(`User modified with ID: ${id}`);
    })
}


// DELETE

const deleteUser = (request, response, next)=>{
    const id = request.params.id;

    pool.query(
        `delete from users where id = ${id}`,
        (err, res)=>{
            if(err){
                next(err);
            }
            response.status(200).send(`User deleted with ID: ${id}`);
    })
}

// GET
const getUserById = (request, response, next) => {
    const id = request.params.id;
    pool.query(`select * from users where id=${id}`, (err, res)=>{
        if(err){
            next(err);
        }
        response.status(200).json(res.rows);
    })
}

// GET ALL
const getUsers = (request, response, next) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, res)=>{
        if(err){
            next(err);
        }
        response.status(200).json(res.rows);
    })
}

export {getUsers, getUserById, createUser, updateUser, deleteUser};