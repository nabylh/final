// src/controllers/userController.js

import bcrypt from "bcrypt";
import db from "../config/db.js"; // Import de la connexion à la base de données

// Fonction de connexion de l'utilisateur
const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Vérification si l'utilisateur existe par email ou pseudo
    const [rows] = await db.promise().query(
      "SELECT * FROM user WHERE email = ? OR pseudo = ?",
      [identifier, identifier]
    );

    const user = rows[0];

    if (!user) {
      // Utilisateur non trouvé
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Retourner les informations utilisateur nécessaires
    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res.status(500).json({ message: "Erreur serveur, veuillez réessayer." });
  }
};

// Exportation des fonctions du contrôleur de manière cohérente
export {
  loginController
};
