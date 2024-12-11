import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editArticle, setEditArticle] = useState(null);



  const [updatedUser, setUpdatedUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    role: "",
    status: ""
  });
  const [updatedArticle, setUpdatedArticle] = useState({
    title: "",
    content: "",
    created_at: "",
    source: "",
    underCategory_id: "",
    undercategory_name: "",
    category_name: "",
    image_url: ""
  });

  const [CreateArticle, setCreateArticle] = useState({
    title: "",
    content: "",
    created_at: "",
    source: "",
    underCategory_id: "",
    undercategory_name: "",
    category_name: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



 // Charger les articles depuis l'API
 useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3000/article", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des articles");
      }

      const data = await response.json();
      setArticles(data);
      
    } catch (err) {
      console.error("Erreur lors de la récupération des articles", err);
      setError("Impossible de récupérer les articles.");
    }
  };

  fetchArticles();
}, []);


 const handleSubmitCreateArticle = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CreateArticle),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'article");
      }
   
      const newArticle = await response.json();
        setArticles((prevArticles) => [...prevArticles, newArticle]);

      setCreateArticle({
        title: "",
        content: "",
        source: "",
        created_at: "",
        underCategory_id: "",
        undercategory_name: "",
        category_name: "",
        image_url: "",
      });
      
    } catch (err) {
      console.error("Erreur lors de la création de l'article :", err);
      setError("Impossible de créer l'article.");
    }
  };
  

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
        setError("Impossible de récupérer les utilisateurs.");
      }
    };

    fetchUsers();
  }, []);

  
  

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur", err);
      setError("Impossible de supprimer l'utilisateur.");
    }
  };

  // Fonction pour supprimer un article
  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await fetch(`http://localhost:3000/article/${articleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'article", err);
      setError("Impossible de supprimer l'article.");
    }
  };
  


  // Fonction pour gérer la modification d'un utilisateur
  const handleEditUser = (user) => {
    setEditUser(user);
    setUpdatedUser({
      pseudo: user.pseudo,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
  };

  // Fonction pour gérer la modification d'un article
  const handleEditArticle = (article) => {
    setEditArticle(article);
    setUpdatedArticle({
      title: article.title,
      content: article.content,
      created_at: article.created_at,
      source: article.source,
      underCategory_id: article.underCategory_id,
      undercategory_name: article.undercategory_name,
      category_name: article.category_name,
      image_url: article.image_url,
    });
  };

  // Fonction pour gérer la soumission du formulaire de modification de l'utilisateur
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }

      const updatedUsersList = users.map((user) =>
        user.id === editUser.id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsersList);
      setEditUser(null);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
      setError("Impossible de mettre à jour l'utilisateur.");
    }
  };

  // Fonction pour gérer la soumission du formulaire de modification de l'article
  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/article/${editArticle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'article");
      }

      const updatedArticlesList = articles.map((article) =>
        article.id === editArticle.id ? { ...article, ...updatedArticle } : article
      );
      setArticles(updatedArticlesList);
      setEditArticle(null);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'article", err);
      setError("Impossible de mettre à jour l'article.");
    }
  };

  // Fonction pour gérer les changements dans le formulaire de modification de l'utilisateur
  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  // Fonction pour gérer les changements dans le formulaire de modification de l'article
  const handleChangeArticle = (e) => {
    const { name, value } = e.target;
    setUpdatedArticle({
      ...updatedArticle,
      [name]: value,
    });
  };

  return (
    <div className="dashboard-container">
      

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="users-container">
        <h3>Liste des Utilisateurs</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.pseudo}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)}>Modifier</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                    
                  </td>
                  
                </tr>
                
              ))
            ) : (
              <tr>
                <td colSpan="6">Aucun utilisateur trouvé</td>
              </tr>
            )}
          </tbody>
        </table>

        {editUser && (
          <div className="edit-form">
            <h3>Modifier l'utilisateur</h3>
            <form onSubmit={handleUpdateUser}>
              <div>
                <label>Pseudo</label>
                <input
                  type="text"
                  name="pseudo"
                  value={updatedUser.pseudo}
                  onChange={handleChangeUser}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChangeUser}
                />
              </div>
              <div>
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleChangeUser}
                />
              </div>
              <div>
                <label>Rôle</label>
                <input
                  type="text"
                  name="role"
                  value={updatedUser.role}
                  onChange={handleChangeUser}
                />
              </div>
              <div>
                <label>Statut</label>
                <input
                  type="text"
                  name="status"
                  value={updatedUser.status}
                  onChange={handleChangeUser}
                />
              </div>
              <button type="submit">Mettre à jour</button>
            </form>
          </div>
        )}
      </div>








{/* liste des articles  */}


      <div className="articles-container">
        <h3>Liste des Articles</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              
              <th>Date de publication</th>
              <th>Source</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>


      





  {articles.length > 0 ? (
    articles.map((article) => (
       // Vérification des articles rendus
      
        <tr key={article.id}>
          <td>{article.id}</td>
          <td>{article.title}</td>
          <td>{article.created_at}</td>
          <td>{article.source}</td>
          <td>{article.category_name}</td>
          <td>
            <button onClick={() => handleEditArticle(article)}>Modifier</button>
            <button onClick={() => handleDeleteArticle(article.id)}>Supprimer</button>
          </td>
        </tr>
      )
    )
  ) : (
    <tr>
      <td colSpan="7">Aucun article trouvé</td>
    </tr>
  )}
</tbody>

        </table>
        {editArticle && (
          <div className="edit-form">
            <h3>Modifier l'article</h3>
            <form onSubmit={handleUpdateArticle}>
              <div>
                <label>Titre</label>
                <input
                  type="text"
                  name="title"
                  value={updatedArticle.title}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>Contenu</label>
                <textarea
                  name="content"
                  value={updatedArticle.content}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>Date de publication</label>
                <input
                  type="date"
                  name="created_at"
                  value={updatedArticle.created_at}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  value={updatedArticle.source}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>ID de la sous-catégorie</label>
                <input
                  type="text"
                  name="underCategory_id"
                  value={updatedArticle.underCategory_id}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>Nom de la sous-catégorie</label>
                <input
                  type="text"
                  name="undercategory_name"
                  value={updatedArticle.undercategory_name}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>Nom de la catégorie</label>
                <input
                  type="text"
                  name="category_name"
                  value={updatedArticle.category_name}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>URL de l'image</label>
                <input
                  type="text"
                  name="image_url"
                  value={updatedArticle.image_url}
                  onChange={handleChangeArticle}
                />
              </div>
              <button type="submit">Mettre à jour</button>
            </form>
          </div>
          
        )}



{CreateArticle && (
  <div className="edit-form">
    <h3>Ajouter un Article</h3>
    <form onSubmit={handleSubmitCreateArticle}>
      <div>
        <label>Titre</label>
        <input
          type="text"
          name="title"
          value={CreateArticle.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Contenu</label>
        <textarea
          name="content"
          value={CreateArticle.content}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Source</label>
        <input
          type="text"
          name="source"
          value={CreateArticle.source}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>ID de la sous-catégorie</label>
        <input
          type="text"
          name="underCategory_id"
          value={CreateArticle.underCategory_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Nom de la sous-catégorie</label>
        <input
          type="text"
          name="undercategory_name"
          value={CreateArticle.undercategory_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Nom de la catégorie</label>
        <input
          type="text"
          name="category_name"
          value={CreateArticle.category_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>URL de l'image</label>
        <input
          type="text"
          name="image_url"
          value={CreateArticle.image_url}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Ajouter l'article</button>
    </form>
  </div>
)}

      </div>
    </div>
  );
};


export default Dashboard;
