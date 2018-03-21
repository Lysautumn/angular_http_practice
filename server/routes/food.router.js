const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Can be moved to a module

// database: hadar
// collection: Food
// documents: individual foods, their rating and how hot they are

let Schema = mongoose.Schema;

let foodSchema = new Schema({
    name: {type: String, required: true},
    deliciousness_rating: {type: Number},
    is_hot: {type: Boolean}
});

let Food = mongoose.model('Food', foodSchema); // Food is the name of our collection

// GET
router.get('/', (req, res) => {
    console.log('GET food');
    Food.find({}, (err, foundFood) => {
        if(err) {
            console.log('mongodb error in GET: ', err);
            res.sendStatus(500);
        } else {
            res.send(foundFood);
        }
    });
});

// POST
router.post('/', (req, res) => {
    console.log('POST food');
    let foodObject = req.body;
    let foodToAdd = new Food(foodObject);
    
    foodToAdd.save((err, savedFood) => {
        if(err) {
            console.log('mongodb error in POST: ', err);
            res.sendStatus(500);
        } else {
            console.log('saved food', savedFood);
            res.sendStatus(201);
        };
    });
});


console.log('food router');


module.exports = router;