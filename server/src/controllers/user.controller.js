// src/controllers/userController.js
import User from "../models/User.js";

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Utilisation de la méthode findAll de User
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id); // Utilisation de la méthode findById de User
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par son pseudo
export const getUserByPseudo = async (req, res) => {
    const { pseudo } = req.params;
    try {
        const user = await User.findByIdentifier(pseudo); // Utilisation de la méthode findByIdentifier de User
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel utilisateur
export const createUser = async (req, res) => {
    const { pseudo, email, password, role, status } = req.body;
    try {
        const newUser = await User.create({ pseudo, email, password, role, status }); // Utilisation de la méthode create de User
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { pseudo, email, password, role, status } = req.body;
    try {
        const updatedUser = await User.update({ pseudo, email, role, status }, id); // Utilisation de la méthode update de User
        if (updatedUser) {
            res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.remove(id); // Utilisation de la méthode remove de User
        if (deletedUser) {
            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
