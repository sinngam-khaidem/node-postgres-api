import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { getUsers, getUserById, createUser, updateUser, deleteUser} from "./queries.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;



// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})

// routes
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users', getUsers);
app.get('/users/:id', getUserById);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
});

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})