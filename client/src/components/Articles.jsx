import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Images from "./Images";

const Articles = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/category");
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
    return <p aria-live="polite">Chargement des catégories...</p>;
  }

  return (
    <article id="articles" aria-labelledby="articles-title">
     
      <section className="categories">
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="category-item"
              aria-labelledby={`category-${category.id}-name`}
              aria-describedby={`category-${category.id}-description`}
            >
              <h3 id={`category-${category.id}-name`}>{category.name}</h3>
              <p id={`category-${category.id}-description`}>
                {category.description}
              </p>
              <Link
                to={`/category/${encodeURIComponent(category.name)}/`}
                className="category-link"
                aria-label={`Voir les articles dans la catégorie ${category.name}`}
              >
                Voir les articles
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <figure className="img" aria-hidden="true">
        <Images />
      </figure>
    </article>
  );
};

export default Articles;
