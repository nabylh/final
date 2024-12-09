import Comments from "../models/Comments.js";

// Récupérer tous les commentaires
const getAllComments = async (req, res) => {
  try {
    const [comments] = await Comments.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires." });
  }
};

// Créer un nouveau commentaire
const createComment = async (req, res) => {
  const { content, user_id, article_id } = req.body;
  if (!content || !user_id || !article_id) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
    const [result] = await Comments.createComment(content, user_id, article_id);
    res.status(201).json({ message: "Commentaire créé avec succès.", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du commentaire." });
  }
};

// Récupérer les commentaires d'un article spécifique
const getCommentsByArticle = async (req, res) => {
    const { article_id } = req.params; // Utilisation de `article_id` pour la récupération
    console.log("article_id reçu dans les paramètres :", article_id);
    try {
      const comments = await Comments.findByArticleId(article_id); // Appel de la méthode correcte
      res.status(200).json(comments);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires :', error);
      res.status(500).json({ message: "Erreur lors de la récupération des commentaires." });
    }
  };

// Mettre à jour un commentaire
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content, status } = req.body;
  try {
    const [result] = await Comments.updateComment(id, content, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commentaire introuvable." });
    }
    res.status(200).json({ message: "Commentaire mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire." });
  }
};

// Supprimer un commentaire
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Comments.deleteComment(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commentaire introuvable." });
    }
    res.status(200).json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression du commentaire." });
  }
};

export {
  getAllComments,
  createComment,
  getCommentsByArticle,
  updateComment,
  deleteComment,
};
