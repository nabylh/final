import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Undercategory = () => {
  const [undercategories, setUndercategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUndercategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/undercategory");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des sous-catégories");
        }
        const data = await response.json();
        setUndercategories(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des sous-catégories :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUndercategories();
  }, []);

  if (loading) {
    return <p>Chargement des sous-catégories...</p>;
  }

  return (
    <ul>
      {undercategories.map((undercategory) => (
        <li key={undercategory.id}>
          <h2>{undercategory.name}</h2>
          <p>{undercategory.description}</p>
          {/* Lien vers les articles associés à cette sous-catégorie */}
          <Link
            to={`/undercategory/${undercategory.name}/articles`} 
            className="articles-link"
          >
            Voir les articles dans cette sous-catégorie
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Undercategory;
