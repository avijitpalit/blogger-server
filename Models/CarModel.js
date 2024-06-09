const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    type: String
})

module.exports = mongoose.model('Car', carSchema);