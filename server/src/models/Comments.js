import pool from "../config/db.js";

class Comments {
  // Récupérer tous les commentaires avec les informations de l'utilisateur et de l'article
  static async findAll() {
    try {
      const [rows] = await pool.query(
        `SELECT c.id, c.content, c.created_at, c.status, u.pseudo, a.title AS article_title
         FROM comment c
         JOIN user u ON c.user_id = u.id
         JOIN article a ON c.article_id = a.id
         ORDER BY c.created_at DESC`
      );
      return rows;
    } catch (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }
  }

  // Récupérer les commentaires pour un article spécifique
  static async findByArticleId(article_id) {
    try {
      const [rows] = await pool.query(
        `SELECT c.id, c.content, c.created_at, c.status, u.pseudo
         FROM comment c
         JOIN user u ON c.user_id = u.id
         WHERE c.article_id = ?  -- Condition mise à jour pour filtrer par l'article ID
         ORDER BY c.created_at DESC`,
        [article_id]  // Le paramètre est passé à la requête
      );
      return rows;
    } catch (error) {
      throw new Error(`Error fetching comments by article ID: ${error.message}`);
    }
  }
  

  // Créer un nouveau commentaire
  static async createComment({ content, user_id, article_id, status = "pending" }) {
    if (!content || content.trim() === "") {
      throw new Error("Le champ 'content' ne peut être vide.");
    }
  
    try {
      const [result] = await pool.query(
        `INSERT INTO comment (content, user_id, article_id, created_at, status) 
         VALUES (?, ?, ?, NOW(), ?)`,
        [content, user_id, article_id, status] // Ajout de status comme paramètre dynamique
      );
  
      return {
        id: result.insertId,
        content,
        user_id,
        article_id,
        status, // Inclure le statut retourné
        created_at: new Date(),
      };
    } catch (error) {
      throw new Error(`Erreur lors de la création du commentaire : ${error.message}`);
    }
  }
  

  // Mettre à jour un commentaire
  static async update({ content, status }, id) {
    try {
      await pool.query(
        `UPDATE comment
         SET content = COALESCE(?, content), status = COALESCE(?, status)
         WHERE id = ?`,
        [content, status, id]
      );
      return { id, content, status };
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }

  // Supprimer un commentaire
  static async remove(id) {
    try {
      await pool.query(`DELETE FROM comment WHERE id = ?`, [id]);
      return { id };
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }
}

export default Comments;
