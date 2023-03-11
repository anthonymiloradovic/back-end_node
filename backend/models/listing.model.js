const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    artwork_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Listing', listingSchema);
