// CommentsPage.jsx
import React, { useState, useEffect } from "react";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:3000/comments");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des commentaires");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return <p>Chargement des commentaires...</p>;
  }

  return (
    <>
      <ul>
        {comments.map((comment, index) => (
          <li
            key={comment.id}
            className={index >= 1 ? `comment-${comment.id}` : "regular-comment"}
          >
            <p>{comment.content}</p>
            <small>
              Publié le : {new Date(comment.created_at).toLocaleDateString()}{" "}
              par {comment.user_pseudo}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentsPage;
