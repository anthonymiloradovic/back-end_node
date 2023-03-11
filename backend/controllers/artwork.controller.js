const Artwork = require("../models/artwork.model");


module.exports = {
  // Créer une oeuvre d'art
  // Créer une oeuvre d'art
  createArtwork: async (req, res) => {
    try {
      const artwork = new Artwork({
        title: req.body.title,
        description: req.body.description,
        artist: req.body.artist,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category
      });
      const savedArtwork = await artwork.save();
      res.status(201).json(savedArtwork);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  

  // Récupérer toutes les oeuvres d'art
  getAllArtworks: async (req, res) => {
    try {
      const artworks = await Artwork.find();
      res.status(200).json(artworks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer une oeuvre d'art par ID
  getArtworkById: async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.params.artworkId);
      if (!artwork) {
        return res.status(404).json({ message: "Oeuvre d'art non trouvée" });
      }
      res.status(200).json(artwork);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Mettre à jour une oeuvre d'art par ID
  updateArtworkById: async (req, res) => {
    try {
      const updatedArtwork = await Artwork.findByIdAndUpdate(
        req.params.artworkId,
        req.body,
        { new: true }
      );
      if (!updatedArtwork) {
        return res.status(404).json({ message: "Oeuvre d'art non trouvée" });
      }
      res.status(200).json(updatedArtwork);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Supprimer une oeuvre d'art par ID
  deleteArtworkById: async (req, res) => {
    try {
      const deletedArtwork = await Artwork.findByIdAndDelete(req.params.artworkId);
      if (!deletedArtwork) {
        return res.status(404).json({ message: "Oeuvre d'art non trouvée" });
      }
      res.status(200).json({ message: "Oeuvre d'art supprimée avec succès" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
