const mongoose = require('mongoose')
const grocerySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('GroceryList', grocerySchema, 'groceries')