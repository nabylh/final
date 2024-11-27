import User from '../models/User.js';

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
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
        const user = await User.findByPseudo(pseudo);
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
        const newUser = await User.create({ pseudo, email, password, role, status });
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
        const updatedUser = await User.update({ pseudo, email, password, role, status }, id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.remove(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
