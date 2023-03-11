const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Créer un utilisateur
router.post("/", userController.createUser);

// Récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get("/:userId", userController.getUserById);

// Mettre à jour un utilisateur par ID
router.put("/:userId", userController.updateUserById);

// Supprimer un utilisateur par ID
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
