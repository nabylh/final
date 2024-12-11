import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";

const CommentsPage = () => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté

  // Charger les données de l'utilisateur connecté au montage du composant
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);
  }, []);

  useEffect(() => {
    if (!articleId) {
      console.error("ID de l'article manquant !");
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

    if (!user || !user.id) {
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
          user_id: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Veuillez vous connecter.");
      }

      const newCommentData = await response.json();
      setComments([...comments, newCommentData.comment]);
      setNewComment("");
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce commentaire ?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du commentaire.");
      }

      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="loading" role="status">Chargement des commentaires...</p>;
  if (error) return <p className="error-message" role="alert">Erreur : {error}</p>;

  return (
    <div className="comments-container" role="region" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Commentaires</h2>

      {comments.length === 0 ? (
        <p className="no-comments" role="alert">
          Aucun commentaire pour cet article. Soyez le premier à commenter !
        </p>
      ) : (
        <ul className="comments-list" aria-label="Liste des commentaires">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item" aria-labelledby={`comment-${comment.id}`}>
              <p
                id={`comment-${comment.id}`}
                className="comment-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(comment.content),
                }}
              ></p>
              <small className="comment-meta">
                Publié le : {new Date(comment.created_at).toLocaleDateString()} par{" "}
                <span aria-label={`Commentaire publié par ${comment.pseudo}`}>{comment.pseudo}</span>
              </small>

              {user && user.role === "admin" && (
                <div className="comment-actions">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteComment(comment.id)}
                    aria-label={`Supprimer le commentaire de ${comment.pseudo}`}
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="navigation">
        <Link to="/article" className="back-link" aria-label="Retour à la liste des articles">
          Retour à la liste des articles
        </Link>
      </div>

      <div className="add-comment-form" aria-labelledby="add-comment-heading">
        <h3 id="add-comment-heading">
          (Veuillez respecter les règles de courtoisie. Tous les commentaires
          sont soumis à la vérification d'un modérateur)
        </h3>
        {submitError && <p className="error-message" role="alert">{submitError}</p>}
        <form onSubmit={handleCommentSubmit} aria-label="Formulaire de publication de commentaire">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            rows="4"
            cols="50"
            aria-placeholder="Écrivez votre commentaire ici..."
            aria-required="true"
          ></textarea>
          <button type="submit" aria-label="Publier le commentaire">Publier</button>
        </form>
      </div>
    </div>
  );
};

export default CommentsPage;
