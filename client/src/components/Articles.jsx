import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Images from "./Images";

const Articles = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/category"); // URL pour récupérer les catégories
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
       
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Chargement des catégories...</p>;
  }

  return (
    <section id="articles">
      {/* Ajout des catégories */}
      <div className="categories">
        
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link
                to={`/category/${encodeURIComponent(category.name)}/`}
                className="category-link"
              >
                Voir les articles
              </Link>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="img">
        
      
        <Images />
      </div>
    </section>
  );
};

export default Articles;
