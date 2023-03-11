const mongoose = require('mongoose');


const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    likedBy: { type: [String] },
});


module.exports = mongoose.model('Artwork', artworkSchema);