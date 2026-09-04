const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product link is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User link is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment text is required']
    }
});

// Part 8 Optimization Index
reviewSchema.index({ product: 1 });

module.exports = mongoose.model('Review', reviewSchema);
