// src/controllers/signup.controller.js
import bcrypt from "bcrypt";
import SignupModel from "../models/Signup.js";  // Import du modèle d'inscription

export const signupController = async (req, res) => {
  const { pseudo, email, password } = req.body;

  // Vérification des champs requis
  if (!pseudo || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si un utilisateur existe déjà avec le même email ou pseudo
    const existingUser = await SignupModel.findByEmailOrPseudo(email, pseudo);

    if (existingUser) {
      return res.status(409).json({ message: "Un utilisateur avec cet email ou pseudo existe déjà." });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await SignupModel.create({ pseudo, email, password: hashedPassword });

    // Retourner les informations de l'utilisateur créé (optionnel)
    res.status(201).json({
      message: "Compte créé avec succès.",
      user: {
        id: newUser.id,  // Utilisation de `id` du modèle
        pseudo: newUser.pseudo,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,  // Vérification du statut
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};
