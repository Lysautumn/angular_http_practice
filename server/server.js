const express = require('express');
const app = express();

const port = process.env.PORT || 5002;
const bodyParser = require('body-parser');

// Look in this file for code related to food
const foodRouter = require('./routes/food.router');

// Mongo code
const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/hadar';

// Connect to Mongo
mongoose.connect(databaseURL);

mongoose.connection.on('connected', () => {
    console.log('connected to mongodb!');
});

mongoose.connection.on('error', (err) => {
    console.log('error connecting to mongodb: ', err);
});

// Configure body-parser for Angular and jQuery
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json()); // This line is required for Angular

app.use(express.static('server/public'));

// Routes
app.use('/food', foodRouter);

app.listen(port, function() {
    console.log('Up and running on port: ', port);
});
