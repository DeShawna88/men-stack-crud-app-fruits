const mongoose = require('mongoose');

// Blueprint for Fruit Object
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

const Fruit = mongoose.mongoose.model('Fruit', fruitSchema)  // Create model using Schema
module.exports = Fruit;   //Export the model to make available for use elsewhere in the app