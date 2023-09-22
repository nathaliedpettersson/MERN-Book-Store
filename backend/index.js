import express from "express";
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('MERN Stack Book Store')
});

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