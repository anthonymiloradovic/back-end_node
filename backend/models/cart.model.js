const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [{
      artwork_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }],
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
