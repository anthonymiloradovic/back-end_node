const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  // Créer un utilisateur
  createUser: async (req, res) => {
    try {
      const { email, password, name, seller, seller_description, seller_email, seller_phone } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ message: "Cet email est déjà utilisé par un autre compte" });
      }

      // Hasher le mot de passe de l'utilisateur
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Créer le nouvel utilisateur
      const user = new User({
        email,
        password: hashedPassword,
        name,
        seller,
        seller_description,
        seller_email,
        seller_phone,
      });

      // Enregistrer l'utilisateur dans la base de données
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Connecter un utilisateur
loginUser: async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "L'email ou le mot de passe est incorrect" });
    }

    // Vérifier si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "L'email ou le mot de passe est incorrect" });
    }

    // Générer un token d'authentification pour l'utilisateur
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(process.env.JWT_SECRET); // Ajoutez cette ligne pour afficher le JWT_SECRET utilisé

    // Mettre à jour le modèle User avec le token d'authentification et le dernier login
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        token: token,
        lastLogin: Date.now(),
        isLoggedIn: true,
      },
      { new: true }
    );

    // Retourner l'utilisateur avec le token
    res.status(200).json({
      userId: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      seller: updatedUser.seller,
      seller_description: updatedUser.seller_description,
      seller_email: updatedUser.seller_email,
      seller_phone: updatedUser.seller_phone,
      token: updatedUser.token,
      isLoggedIn: updatedUser.isLoggedIn,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},


// Déconnecter un utilisateur
logoutUser: async (req, res) => {
  try {
    const userId = req.params.userId;

    // Mettre à jour le modèle User avec le token d'authentification et le dernier login
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        token: null,
        isLoggedIn: false,
        lastLogin: Date.now(),
      },
      { new: true }
    );

    res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},


  // Récupérer tous les utilisateurs
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Mettre à jour un utilisateur par ID
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Vérifier la disponibilité d'un email
  checkEmailAvailability: async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(200).json({ available: true });
      }
      res.status(200).json({ available: false });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Supprimer un utilisateur par ID
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
