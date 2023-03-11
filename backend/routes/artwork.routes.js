const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artwork.controller');



router.get('/', artworkController.getAllArtworks);
router.get('/:id', artworkController.getArtworkById);
router.post('/', artworkController.createArtwork);
router.put('/:id', artworkController.updateArtworkById);
router.delete('/:id', artworkController.deleteArtworkById);

module.exports = router;
