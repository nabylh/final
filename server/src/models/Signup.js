// src/models/Signup.js
import pool from "../config/db.js";  // Connexion à la base de données
import bcrypt from "bcrypt"; 

class Signup {
  // Vérifie si un utilisateur existe déjà avec un email ou un pseudo
  static async findByEmailOrPseudo(email, pseudo) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM user WHERE email = ? OR pseudo = ?",
        [email, pseudo]
      );
      return rows[0]; // Retourne l'utilisateur trouvé (s'il existe)
    } catch (error) {
      throw new Error(`Erreur lors de la recherche d'utilisateur par email ou pseudo: ${error.message}`);
    }
  }

  // Crée un nouvel utilisateur
  static async create({ pseudo, email, password }) {
    try {
      // Hashage du mot de passe avant de l'insérer dans la base de données
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await pool.query(
        "INSERT INTO user (pseudo, email, password, created_at) VALUES (?, ?, ?, NOW())",
        [pseudo, email, hashedPassword]
      );

      // Retourner les données de l'utilisateur créé
      return {
        id: result.insertId,  // ID généré automatiquement
        pseudo,
        email,
        role: 'user',         // Valeur par défaut pour le rôle
        status: '1',     // Valeur par défaut pour le statut
      };
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
  }
}

export default Signup;
