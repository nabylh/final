import React, { useState, useEffect } from 'react';

// Composant pour le Dashboard de gestion des articles, utilisateurs, commentaires et images
const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);

  const handleSectionChange = (section) => {
    setSelectedSection((prevSection) => (prevSection === section ? null : section));
  };

  useEffect(() => {
    // Fonction générique pour récupérer des données depuis une API
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des données (${url}):`, error);
      }
    };

    if (selectedSection === 'articles') fetchData('http://localhost:3000/article', setArticles);
    if (selectedSection === 'users') fetchData('http://localhost:3000/user', setUsers);
    if (selectedSection === 'comments') fetchData('http://localhost:3000/comment', setComments);
    if (selectedSection === 'images') fetchData('http://localhost:3000/image', setImages);
  }, [selectedSection]);

  return (
    <div className='dashboard'>
      <div>
        <h2>Gestion des Articles</h2>
        <button onClick={() => handleSectionChange('articles')}>Gérer les Articles</button>

        {selectedSection === 'articles' && (
          <div>
            <button>Ajouter un Article</button>
            <button>Supprimer un Article</button>
            <button>Modifier un Article</button>
            <ul>
              {articles.map((article) => (
                <li key={article.id}>{article.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h2>Gestion des Utilisateurs</h2>
        <button onClick={() => handleSectionChange('users')}>Gérer les Utilisateurs</button>

        {selectedSection === 'users' && (
          <div>
            <button>Ajouter un Utilisateur</button>
            <button>Supprimer un Utilisateur</button>
            <button>Modifier un Utilisateur</button>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <p>{user.pseudo}</p>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h2>Gestion des Commentaires</h2>
        <button onClick={() => handleSectionChange('comments')}>Gérer les Commentaires</button>

        {selectedSection === 'comments' && (
          <div>
            <button>Ajouter un Commentaire</button>
            <button>Supprimer un Commentaire</button>
            <button>Modifier un Commentaire</button>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p><strong>{comment.author}</strong>: {comment.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h2>Gestion des Images</h2>
        <button onClick={() => handleSectionChange('images')}>Gérer les Images</button>

        {selectedSection === 'images' && (
          <div>
            <button>Ajouter une Image</button>
            <button>Supprimer une Image</button>
            <button>Modifier une Image</button>
            <ul>
              {images.map((image) => (
                <li key={image.id}>
                  <p>{image.title}</p>
                  <img
                    src={image.url}
                    alt={image.title}
                    style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
