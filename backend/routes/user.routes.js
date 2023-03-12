const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Créer un utilisateur
router.post("/", userController.createUser);

// Récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get("/:userId", userController.getUserById);

// Vérifier la disponibilité d'un email
router.get("/email/:email", userController.checkEmailAvailability);

// Mettre à jour un utilisateur par ID
router.put("/:userId", userController.updateUserById);

// Supprimer un utilisateur par ID
router.delete("/:userId", userController.deleteUserById);

// Connexion de l'utilisateur
router.post("/login", userController.loginUser);

// Déconnexion de l'utilisateur
router.post("/logout", userController.logoutUser);

module.exports = router;
