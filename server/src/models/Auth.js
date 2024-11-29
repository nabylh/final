import pool from '../config/db.js';
import bcrypt from 'bcrypt';

class Auth {
    // Trouver un utilisateur par email ou pseudo
    static async findByIdentifier(identifier) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM user WHERE email = ? OR pseudo = ?`,
                [identifier, identifier]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw new Error("Erreur lors de la recherche de l'utilisateur : " + error.message);
        }
    }

    // Vérification du mot de passe
    static async comparePassword(inputPassword, storedPassword) {
        return bcrypt.compare(inputPassword, storedPassword);
    }

    // Inscription d'un nouvel utilisateur
    static async register({ pseudo, email, password, role = 'user', status = 'active' }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await pool.query(
                `INSERT INTO user (pseudo, email, password, role, status) VALUES (?, ?, ?, ?, ?)`,
                [pseudo, email, hashedPassword, role, status]
            );
            return { id: result.insertId, pseudo, email, role, status };
        } catch (error) {
            throw new Error("Erreur lors de l'inscription de l'utilisateur : " + error.message);
        }
    }

    // Vérifier les identifiants utilisateur
    static async login(identifier, password) {
        try {
            const user = await this.findByIdentifier(identifier);
            if (user && await this.comparePassword(password, user.password)) {
                return { id: user.id, pseudo: user.pseudo, email: user.email, role: user.role };
            }
            throw new Error("Identifiants incorrects");
        } catch (error) {
            throw new Error("Erreur lors de la connexion : " + error.message);
        }
    }

    // Mise à jour du mot de passe utilisateur
    static async updatePassword(id, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await pool.query(`UPDATE user SET password = ? WHERE id = ?`, [hashedPassword, id]);
            return { message: "Mot de passe mis à jour avec succès" };
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour du mot de passe : " + error.message);
        }
    }

    // Supprimer un utilisateur
    static async deleteAccount(id) {
        try {
            await pool.query(`DELETE FROM user WHERE id = ?`, [id]);
            return { message: "Compte utilisateur supprimé avec succès" };
        } catch (error) {
            throw new Error("Erreur lors de la suppression du compte utilisateur : " + error.message);
        }
    }

    // Vérifier si un utilisateur existe par email ou pseudo
    static async findByEmailOrPseudo(email, pseudo) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM user WHERE email = ? OR pseudo = ?`,
                [email, pseudo]
            );
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw new Error("Erreur lors de la vérification de l'utilisateur : " + error.message);
        }
    }
}

export default Auth;
