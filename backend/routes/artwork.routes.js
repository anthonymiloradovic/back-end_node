const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artwork.controller');



router.get('/', artworkController.getAllArtworks);
router.get('/:id', artworkController.getArtworkById);

router.put('/:id', artworkController.updateArtworkById);
router.delete('/:id', artworkController.deleteArtworkById);

// Créer une oeuvre d'art pour un utilisateur spécifique
router.post("/:userId", artworkController.createArtwork);

module.exports = router;
