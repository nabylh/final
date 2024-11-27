import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Fonction pour la connexion de l'utilisateur
export const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: "Identifiant ou mot de passe manquant" });
    }

    try {
        // Chercher l'utilisateur par pseudo ou email
        const user = await User.findByIdentifier(identifier);

        if (user && await bcrypt.compare(password, user.password)) {
            // Créer la session pour l'utilisateur
            req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email };
            return res.json({ message: "Connexion réussie", user: req.session.user });
        } else {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }
    } catch (err) {
        console.error("Erreur lors de l'authentification :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// Fonction pour récupérer le profil de l'utilisateur connecté
export const getUserProfile = (req, res) => {
    // Si l'utilisateur est authentifié, récupérer ses informations
    if (req.session.user) {
        return res.json({ user: req.session.user });
    } else {
        return res.status(401).json({ message: "Non autorisé" });
    }
};

// Fonction pour déconnecter l'utilisateur
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        return res.json({ message: "Déconnexion réussie" });
    });
};
