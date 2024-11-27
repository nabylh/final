import bcrypt from "bcrypt";
import User from "../models/Login.js"; // Import du modèle User

export const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Vérification si l'utilisateur existe par email ou pseudo
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { pseudo: identifier }],
      },
    });

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
    // Ajoutez un cookie de session si votre application utilise un gestionnaire de session
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
