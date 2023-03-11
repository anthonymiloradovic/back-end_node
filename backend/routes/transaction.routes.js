const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// Créer une transaction
router.post('/', transactionController.createTransaction);

// Récupérer toutes les transactions
router.get('/', transactionController.getAllTransactions);

// Récupérer une transaction par ID
router.get('/:transactionId', transactionController.getTransactionById);

// Mettre à jour une transaction par ID
router.put('/:transactionId', transactionController.updateTransactionById);

// Supprimer une transaction par ID
router.delete('/:transactionId', transactionController.deleteTransactionById);

module.exports = router;
