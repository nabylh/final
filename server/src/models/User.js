import bcrypt from 'bcrypt';  // Importation de bcryptjs
import pool from "../config/db.js";

class User {
    // Récupérer tous les utilisateurs
    static async findAll() {
        try {
            const [rows] = await pool.query(
                "SELECT id, pseudo, email, role, created_at, status FROM user ORDER BY created_at"
            );
            return rows;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    // Récupérer un utilisateur par son pseudo
    static async findByPseudo(pseudo) {
        try {
            const [rows] = await pool.query(
                "SELECT id, pseudo, email, role, created_at, status FROM user WHERE pseudo = ?",
                [pseudo]
            );
            return rows[0]; // Retourne un utilisateur ou null si pas trouvé
        } catch (error) {
            throw new Error(`Error fetching user by pseudo: ${error.message}`);
        }
    }

    // Récupérer un utilisateur par son ID
    static async findById(id) {
        try {
            const [rows] = await pool.query(
                "SELECT id, pseudo, email, role, created_at, status FROM user WHERE id = ?",
                [id]
            );
            return rows[0]; // Retourne un utilisateur ou null si pas trouvé
        } catch (error) {
            throw new Error(`Error fetching user by id: ${error.message}`);
        }
    }

    // Créer un nouvel utilisateur
    static async create({ pseudo, email, password, role, status }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO user (pseudo, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
                [pseudo, email, password, role, status]
            );
            return { id: result.insertId, pseudo, email, role, status };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    // Mettre à jour un utilisateur
    static async update({ pseudo, email, password, role, status }, id) {
        try {
            await pool.query(
                "UPDATE user SET pseudo = ?, email = ?, password = ?, role = ?, status = ? WHERE id = ?",
                [pseudo, email, password, role, status, id]
            );
            return { id, pseudo, email, role, status };
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Supprimer un utilisateur
    static async remove(id) {
        try {
            await pool.query("DELETE FROM user WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default User;

