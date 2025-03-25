const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

const Fruit = mongoose.mongoose.model('Fruit', fruitSchema)
module.exports = Fruit;