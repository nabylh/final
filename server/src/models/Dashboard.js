// src/models/Dashboard.js

// Importation des modèles nécessaires
import pool from "../config/db.js";



class Dashboard {
    // Méthode pour récupérer tous les utilisateurs
    static async getAllUsers() {
        try {
            const [rows] = await pool.query("SELECT * FROM user");
            return rows;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des utilisateurs : ${error.message}`);
        }
    }

    // Méthode pour récupérer un utilisateur par ID
    static async getUserById(id) {
        try {
            const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("Utilisateur non trouvé");
            }
            return rows[0];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de l'utilisateur : ${error.message}`);
        }
    }

    // Méthode pour créer un nouvel utilisateur
    static async createUser(data) {
        try {
            const { pseudo, email, password, role } = data;
            const [result] = await pool.query(
                "INSERT INTO user (pseudo, email, password, role) VALUES (?, ?, ?, ?)",
                [pseudo, email, password, role]
            );
            return { id: result.insertId, pseudo, email, role };
        } catch (error) {
            throw new Error(`Erreur lors de la création de l'utilisateur : ${error.message}`);
        }
    }

    // Méthode pour mettre à jour un utilisateur
    static async updateUser(id, data) {
        try {
            const { pseudo, email, password, role } = data;
            const [result] = await pool.query(
                "UPDATE user SET pseudo = ?, email = ?, password = ?, role = ? WHERE id = ?",
                [pseudo, email, password, role, id]
            );

            if (result.affectedRows === 0) {
                throw new Error("Utilisateur non trouvé");
            }

            return { id, pseudo, email, role };
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
        }
    }

    // Méthode pour supprimer un utilisateur
    static async deleteUser(id) {
        try {
            const [result] = await pool.query("DELETE FROM user WHERE id = ?", [id]);

            if (result.affectedRows === 0) {
                throw new Error("Utilisateur non trouvé");
            }

            return { message: "Utilisateur supprimé avec succès" };
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
        }
    }

    // Méthode pour récupérer tous les articles
    static async getAllArticles() {
        try {
            const [rows] = await pool.query("SELECT * FROM article");
            return rows;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des articles : ${error.message}`);
        }
    }

    // Méthode pour récupérer un article par ID
    static async getArticleById(id) {
        try {
            const [rows] = await pool.query("SELECT * FROM article WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("Article non trouvé");
            }
            return rows[0];
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de l'article : ${error.message}`);
        }
    }

    // Méthode pour créer un nouvel article
    static async createArticle(data) {
        try {
            const { title, content, source, undercategory_id } = data;
            const [result] = await pool.query(
                "INSERT INTO article (title, content, source, undercategory_id) VALUES (?, ?, ?, ?)",
                [title, content, source, undercategory_id]
            );
            return { id: result.insertId, title, content, source, undercategory_id };
        } catch (error) {
            throw new Error(`Erreur lors de la création de l'article : ${error.message}`);
        }
    }

    // Méthode pour mettre à jour un article
    static async updateArticle(id, data) {
        try {
            const { title, content, source, undercategory_id } = data;
            const [result] = await pool.query(
                "UPDATE article SET title = ?, content = ?, source = ?, undercategory_id = ? WHERE id = ?",
                [title, content, source, undercategory_id, id]
            );

            if (result.affectedRows === 0) {
                throw new Error("Article non trouvé");
            }

            return { id, title, content, source, undercategory_id };
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de l'article : ${error.message}`);
        }
    }

    // Méthode pour supprimer un article
    static async deleteArticle(id) {
        try {
            const [result] = await pool.query("DELETE FROM article WHERE id = ?", [id]);

            if (result.affectedRows === 0) {
                throw new Error("Article non trouvé");
            }

            return { message: "Article supprimé avec succès" };
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de l'article : ${error.message}`);
        }
    }
}



   

    /*
    // Méthode pour récupérer tous les commentaires
    static async getAllComments() {
        try {
            return await Comment.findAll();
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des commentaires : ${error.message}`);
        }
    }

    // Méthode pour récupérer un commentaire par ID
    static async getCommentById(id) {
        try {
            const comment = await Comment.findById(id);
            if (!comment) {
                throw new Error("Commentaire non trouvé");
            }
            return comment;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du commentaire : ${error.message}`);
        }
    }

    // Méthode pour créer un nouveau commentaire
    static async createComment(data) {
        try {
            const { content, user_id, article_id } = data;
            const newComment = await Comment.create({ content, user_id, article_id });
            return newComment;
        } catch (error) {
            throw new Error(`Erreur lors de la création du commentaire : ${error.message}`);
        }
    }

    // Méthode pour mettre à jour un commentaire
    static async updateComment(id, data) {
        try {
            const { content } = data;
            const updatedComment = await Comment.update({ content }, id);

            if (!updatedComment) {
                throw new Error("Commentaire non trouvé");
            }

            return updatedComment;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour du commentaire : ${error.message}`);
        }
    }

    // Méthode pour supprimer un commentaire
    static async deleteComment(id) {
        try {
            const result = await Comment.remove(id);

            if (!result) {
                throw new Error("Commentaire non trouvé");
            }

            return { message: "Commentaire supprimé avec succès" };
        } catch (error) {
            throw new Error(`Erreur lors de la suppression du commentaire : ${error.message}`);
        }
    }
    */


// Exportation de la classe Dashboard
export default Dashboard;
