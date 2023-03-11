const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listing.controller');

router.get('/', listingsController.getAllListings);
router.get('/:listingId', listingsController.getListingById);
router.post('/', listingsController.createListing);
router.put('/:listingId', listingsController.updateListingById);
router.delete('/:listingId', listingsController.deleteListingById);

module.exports = router;
