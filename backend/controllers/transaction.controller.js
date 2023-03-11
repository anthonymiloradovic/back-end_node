const Transaction = require('../models/transaction.model');
const Artwork = require('../models/artwork.model');

module.exports = {
  // Créer une transaction
  createTransaction: async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.body.artwork_id);
      if (!artwork) {
        return res.status(404).json({ message: "Oeuvre non trouvée" });
      }
      if (req.body.seller_id === req.body.buyer_id) {
        return res.status(400).json({ message: "L'acheteur et le vendeur ne peuvent pas etre la meme personne" });
      }
      const transaction = new Transaction({
        artwork_id: req.body.artwork_id,
        seller_id: req.body.seller_id,
        buyer_id: req.body.buyer_id,
        price: req.body.price,
        date: new Date()
      });
      const savedTransaction = await transaction.save();
      res.status(201).json(savedTransaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    },
  // Récupérer une transaction par ID
  getTransactionById: async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.transactionId);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction non trouvée" });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer toutes les transactions
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Mettre à jour une transaction par ID
  updateTransactionById: async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.transactionId,
        req.body,
        { new: true }
      );
      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction non trouvée" });
      }
      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Supprimer une transaction par ID
  deleteTransactionById: async (req, res) => {
    try {
      const deletedTransaction = await Transaction.findByIdAndDelete(req.params.transactionId);
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction non trouvée" });
      }
      res.status(200).json({ message: "Transaction supprimée avec succès" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
