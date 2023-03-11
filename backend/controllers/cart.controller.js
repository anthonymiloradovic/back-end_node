const Cart = require('../models/cart.model');

module.exports = {
  // Créer un panier
  createCart: async (req, res) => {
    try {
      // Vérifier si un panier existe déjà pour cet utilisateur
      const existingCart = await Cart.findOne({ user_id: req.body.user_id });
      if (existingCart) {
        return res.status(409).json({ message: "Un panier existe déjà pour cet utilisateur" });
      }
      const cart = new Cart({
        user_id: req.body.user_id,
        items: req.body.items,
        date_created: new Date()
      });
      const savedCart = await cart.save();
      res.status(201).json(savedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer un panier par ID
  getCartById: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cartId);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer tous les paniers
  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Mettre à jour un panier par ID
  updateCartById: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.cartId,
        req.body,
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Supprimer un panier par ID
  deleteCartById: async (req, res) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.cartId);
      if (!deletedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
