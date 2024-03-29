import express from "express";
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
const server = express;

// Parse request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors (*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('MERN Stack Book Store')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log('App is connected to the database!');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error, 'Error when trying to connect to database.');
    });

    module.exports = server;