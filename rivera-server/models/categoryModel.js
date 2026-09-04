const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required']
    },
    description: {
        type: String,
        required: [true, 'Category description is required']
    }
});

module.exports = mongoose.model('Category', categorySchema);
