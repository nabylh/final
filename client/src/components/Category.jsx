import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  const {categoryName} = useParams();
  const [underCategories, setUnderCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnderCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category/${encodeURIComponent(categoryName)}/undercategory`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des sous-catégories");
        }
        const data = await response.json();
        console.log("Données des sous-catégories récupérées:", data);
        setUnderCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sous-catégories :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnderCategories();
  }, [categoryName]);

  if (loading) {
    return <p>Chargement des sous-catégories...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (underCategories.length === 0) {
    return <p>Aucune sous-catégorie trouvée pour cette catégorie.</p>;
  }

  return (
    <div>
      <ul className="main-article">
        <h2>Articles de la catégorie : {categoryName}</h2>
        {underCategories.map((underCategory, index) => {
          
          
          
          return (
            <li key={underCategory.id} className={`article-item-${index}`}>
              
              <h3>{underCategory.name}</h3>
              <p>{underCategory.description}
              <Link to={`/category/${encodeURIComponent(categoryName)}/undercategory/${encodeURIComponent(underCategory.name)}/article`}>
                Voir les articles
              </Link>
              {underCategory.image_url && (
                <img
                  src={underCategory.image_url}
                  alt={`Image de la sous-catégorie ${underCategory.name}`}
                  className="underCategory-image"
                />
                
              )}
             
              </p>
             
             
             
             
              
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;


