const Listing = require('../models/listing.model');

module.exports = {
  // Créer une annonce
  createListing: async (req, res) => {
    try {
      const listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        artwork_id: req.body.artwork_id,
        seller_id: req.body.seller_id,
        price: req.body.price,
        date_created: new Date()
      });
      const savedListing = await listing.save();
      res.status(201).json(savedListing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer toutes les annonces
  getAllListings: async (req, res) => {
    try {
      const listings = await Listing.find();
      res.status(200).json(listings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer une annonce par ID
  getListingById: async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.listingId);
      if (!listing) {
        return res.status(404).json({ message: "Annonce non trouvée" });
      }
      res.status(200).json(listing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Mettre à jour une annonce par ID
  updateListingById: async (req, res) => {
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.listingId,
        req.body,
        { new: true }
      );
      if (!updatedListing) {
        return res.status(404).json({ message: "Annonce non trouvée" });
      }
      res.status(200).json(updatedListing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Supprimer une annonce par ID
  deleteListingById: async (req, res) => {
    try {
      const deletedListing = await Listing.findByIdAndDelete(req.params.listingId);
      if (!deletedListing) {
        return res.status(404).json({ message: "Annonce non trouvée" });
      }
      res.status(200).json({ message: "Annonce supprimée avec succès" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
