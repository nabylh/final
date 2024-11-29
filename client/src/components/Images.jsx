import React, { useState, useEffect } from "react";


const Images = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/image"); // Remplacez l'URL si nécessaire
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des images");
        }
        const data = await response.json();
        
        setImages(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Chargement des images...</p>;
  }

  return (
    <ul className="image-list">
      {images.map((image, index) => (
        <li key={image.id} className={` image-item-${index}`}>
          {/* Affichage de l'image */}
          <img className={`image-display-${index}`}
            src={image.url}
            alt={image.description || "Image sans description"} 
            
            
          />
          {/* Affichage de l'URL et de la description */}
        </li>
      ))}
    </ul>
  );
};

export default Images;
