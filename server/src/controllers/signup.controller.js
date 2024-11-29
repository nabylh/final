// src/controllers/signup.controller.js
import Signup from "../models/Signup.js"; // Import du modèle Signup
import bcrypt from "bcrypt"; // Import de bcrypt pour le hashage du mot de passe

// Fonction de création d'un utilisateur (inscription)
 const signupController = async (req, res) => {
  const { pseudo, email, password } = req.body;

  // Vérification des champs requis
  if (!pseudo || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si un utilisateur existe déjà avec le même email ou pseudo
    const existingUser = await Signup.findByEmailOrPseudo(email, pseudo);

    if (existingUser) {
      return res.status(409).json({ message: "Un utilisateur avec cet email ou pseudo existe déjà." });
    }

    // Création de l'utilisateur
    const newUser = await Signup.create({ pseudo, email, password });

    // Retourner les informations de l'utilisateur créé (optionnel)
    res.status(201).json({
      message: "Compte créé avec succès.",
      user: {
        id: newUser.id,
        pseudo: newUser.pseudo,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Exportation du contrôleur
export {
  signupController,
};
