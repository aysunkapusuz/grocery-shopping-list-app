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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //!Change: this field should be required because the app will break if the user is not present.
        
      },
    
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Grocery', grocerySchema, 'groceries')