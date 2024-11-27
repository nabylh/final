const express = require("express");
const router = express.Router();
const db = require("../config/db"); 

// Route pour récupérer les commentaires d'un article spécifique en fonction de l'id de l'article ( SELECT )  --> accessible à tous ( Pas de controle )
// Route pour récupérer tous les commentaires d'un utilisateur en fonction de l'id de l'utilisateur ( SELECT ) --> accessible qu'aux admin
// Route pour récupérer UN commentaire en fonction de son id ( SELECT ) --> accessible qu'aux admin

// Route pour ajouter un nouveau commentaire sur un article dont on a l'id ( INSERT INTO )  --> accessible qu'aux personnes connectées

// Route pour modifier un commentaire par rapport à son l'id ( UPDATE ) --> accessible qu'aux admin
// Route permettant d'activer ou désactiver un commentaire de l'affichage ( statut ) ( UPDATE ) --> accessible qu'aux admin

// Route pour supprimer un commentaire par rapport à son l'id ( DELETE ) --> accessible qu'aux admin




router.get("/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const [comments] = await db.query(
      "SELECT * FROM comments WHERE article_id = ?",
      [articleId]
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires" });
  }
});

module.exports = router;

