import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UndercategoryArticles = () => {
  const { undercategoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/article/undercategory/${undercategoryName}`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }

        const data = await response.json();
        
        setArticles(data);
      } catch (error) {
        setError(error.message);
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [undercategoryName]);
   
  if (loading) {
    return <p>Chargement des articles...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (articles.length === 0) {
    return <p>Aucun article trouvé dans cette sous-catégorie.</p>;
  }

  return (
    <div className="main-undercategoryArticle">
      <h1>{undercategoryName}</h1>
      <ul>
  {articles.map((article) => {
    
    return (
      <li key={article.id}>
        
        <p><h2>{article.title}</h2>{article.content} <small>
          Publié le : {new Date(article.created_at).toLocaleDateString()}
        </small>
        <Link to={`/comments/${article.id}`} className="comments-link">
          Voir les commentaires
        </Link></p>
        {/* Vérifie si une image est disponible pour l'article */}
        {article.image_url ? (
          <img
            className="image-article"
            src={article.image_url}
            alt={`Image pour ${article.title}`}
          />
        ) : (
          <p>Aucune image disponible.</p>
        )}
      
      </li>
    );
  })}
</ul>
    </div>
  );
};

export default UndercategoryArticles;
