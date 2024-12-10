import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CommentsPage = () => {
  const { articleId } = useParams();
  console.log("Valeur de articleId récupérée : ", articleId);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(""); // État pour le nouveau commentaire
  const [submitError, setSubmitError] = useState(null); // Gestion des erreurs pour l'envoi

  useEffect(() => {
    if (!articleId) {
      console.error("ID de l'article manquant !");
      return;
    }

    // Vérifier si les commentaires sont stockés localement
    const storedComments = localStorage.getItem(`comments-${articleId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/comments/article/${articleId}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des commentaires.");
        }
        const data = await response.json();
        setComments(data);

        // Stocker les commentaires dans localStorage
        localStorage.setItem(`comments-${articleId}`, JSON.stringify(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [articleId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!newComment.trim()) {
      setSubmitError("Le contenu du commentaire ne peut pas être vide.");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo || !userInfo.id) {
      setSubmitError("Vous devez être connecté pour laisser un commentaire.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: newComment,
          article_id: articleId,
          user_id: userInfo.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du commentaire.");
      }

      const newCommentData = await response.json();
      console.log("Données du nouveau commentaire :", newCommentData);

      // Ajouter le nouveau commentaire localement
      const updatedComments = [...comments, newCommentData.comment];
      setComments(updatedComments);

      // Mettre à jour localStorage
      localStorage.setItem(`comments-${articleId}`, JSON.stringify(updatedComments));

      setNewComment(""); // Réinitialiser le formulaire
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  // Gestion des états de chargement, erreur ou absence de commentaires
  if (loading) {
    return <p className="loading">Chargement des commentaires...</p>;
  }

  if (error) {
    return <p className="error-message">Erreur : {error}</p>;
  }

  // Rendu des commentaires et du formulaire
  return (
    <div className="comments-container">
      {comments.length === 0 ? (
        <p className="no-comments">
          Aucun commentaire pour cet article. Soyez le premier à commenter !
        </p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className={`comment-item ${comment.id}`}>
              <p className="comment-content">{comment.content}</p>
              <small className="comment-meta">
                Publié le : {new Date(comment.created_at).toLocaleDateString()}{" "}
                par {comment.pseudo}
              </small>
            </li>
          ))}
        </ul>
      )}

      <div className="navigation">
        <Link to="/article" className="back-link">
          Retour à la liste des articles
        </Link>
      </div>

      <div className="add-comment-form">
        <h3>Laisser un commentaire</h3>
        {submitError && <p className="error-message">{submitError}</p>}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            rows="4"
            cols="50"
          ></textarea>
          <button type="submit">Publier</button>
        </form>
      </div>
    </div>
  );
};

export default CommentsPage;
