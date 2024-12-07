// Route pour la déconnexion
app.post("/logout", (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Erreur lors de la déconnexion" });
            }
            res.clearCookie("connect.sid");  
            return res.json({ message: "Déconnexion réussie" });
        });
    } else {
        return res.status(400).json({ message: "Aucune session active" });
    }
});



// Route pour l'inscription d'un utilisateur
app.post("/user", async (req, res) => {
    const { pseudo, email, password } = req.body;

    // Vérification des champs
    if (!pseudo || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérification si l'email ou le pseudo existe déjà
    try {
        const [[existingUser]] = await pool.promise().query(
            "SELECT * FROM user WHERE email = ? OR pseudo = ?", 
            [email, pseudo]
        );

        if (existingUser) {
            return res.status(400).json({ message: "Cet email ou pseudo est déjà utilisé" });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion dans la base de données
        const [result] = await pool.promise().query(
            "INSERT INTO user (pseudo, email, password, status, created_at) VALUES (?, ?, ?, ?, NOW())", 
            [pseudo, email, hashedPassword, 1]
        );

        // Retourner les informations de l'utilisateur créé
        return res.status(201).json({
            message: "Compte créé avec succès",
            user: {
                id: result.insertId, 
                pseudo, 
                email, 
                role: "user", 
                status: 0
            }
        });
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});



// Exemple d'authentification (lorsque l'utilisateur se connecte)
app.get("/user", async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: "Pseudo/Email ou mot de passe manquant" });
    }

    console.log("Reçu :", req.body);

    try {
        // Construire la requête pour rechercher l'utilisateur par pseudo ou email
        const [[user]] = await pool.promise().query(
            "SELECT * FROM user WHERE (pseudo = ? OR email = ?)",
            [identifier, identifier] // Utilisation de `identifier` pour pseudo ou email
        );

        // Vérifier si l'utilisateur existe et si le mot de passe correspond
        if (user && user.password === password) {
            req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email }; // Crée la session
            return res.json({ message: "Connexion réussie", user: req.session.user });
        }

        return res.status(401).json({ message: "Identifiants incorrects" });
    } catch (err) {
        console.error("Erreur lors de l'authentification :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});




















import "dotenv/config"; 
import express from "express"; 
import path from "path"; 
import cors from "cors"; 
import session from "express-session"; 
import bcrypt from "bcrypt";
import { createRequire } from "module"; 
import mysql from "mysql2"; // Importation du module mysql2
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session); 

import router from "./routes/index.routes.js"; 

const app = express(); 

const PORT = process.env.PORT || 3000; 

// Middleware pour parser les données JSON et URL-encodées (placer avant les routes)
app.use(express.json()); // Middleware pour parser le JSON
app.use(express.urlencoded({ extended: false })); // Middleware pour parser les données URL-encodées

// Configuration de CORS
app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, 
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], 
        allowedHeaders: ["Content-Type"], 
    })
);

// Configuration du pool de connexions MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Limite de connexions simultanées
    queueLimit: 0
});

// Configuration des sessions
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION,  // Clé secrète pour la session
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Durée de vie de la session : 24 heures
            httpOnly: true,
            secure: false, // Changez à true en production avec HTTPS
        },
        store: new MySQLStore({
            host: process.env.DB_HOST, // Hôte de la base de données
            port: process.env.DB_PORT, // Port de la base de données
            user: process.env.DB_USER, // Utilisateur de la base de données
            password: process.env.DB_PASS, // Mot de passe de la base de données
            database: process.env.DB_NAME, // Nom de la base de données
        }),
    })
);


// Exemple d'authentification (lorsque l'utilisateur se connecte)
app.post("/user", async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: "Pseudo/Email ou mot de passe manquant" });
    }

    console.log("Reçu :", req.body);

    try {
        // Construire la requête pour rechercher l'utilisateur par pseudo ou email
        const [[user]] = await pool.promise().query(
            "SELECT * FROM user WHERE (pseudo = ? OR email = ?)",
            [identifier, identifier] // Utilisation de `identifier` pour pseudo ou email
        );

        // Vérifier si l'utilisateur existe et si le mot de passe correspond
        if (user && user.password === password) {
            req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email }; // Crée la session
            return res.json({ message: "Connexion réussie", user: req.session.user });
        }

        return res.status(401).json({ message: "Identifiants incorrects" });
    } catch (err) {
        console.error("Erreur lors de l'authentification :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});




// Route pour l'inscription d'un utilisateur
app.post("/user", async (req, res) => {
    const { pseudo, email, password } = req.body;

    // Vérification des champs
    if (!pseudo || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérification si l'email ou le pseudo existe déjà
    try {
        const [[existingUser]] = await pool.promise().query(
            "SELECT * FROM user WHERE email = ? OR pseudo = ?", 
            [email, pseudo]
        );

        if (existingUser) {
            return res.status(400).json({ message: "Cet email ou pseudo est déjà utilisé" });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion dans la base de données
        const [result] = await pool.promise().query(
            "INSERT INTO user (pseudo, email, password, status, created_at) VALUES (?, ?, ?, ?, NOW())", 
            [pseudo, email, hashedPassword, 1]
        );

        // Retourner les informations de l'utilisateur créé
        return res.status(201).json({
            message: "Compte créé avec succès",
            user: {
                id: result.insertId, 
                pseudo, 
                email, 
                role: "user", 
                status: 0
            }
        });
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});
// Route pour la déconnexion
app.post("/logout", (req, res) => {
    // Vérifier si une session existe
    if (req.session.user) {
        // Détruire la session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Erreur lors de la déconnexion" });
            }

            // Effacer le cookie de session
            res.clearCookie("connect.sid");  // Utilisez le nom de votre cookie de session (par défaut 'connect.sid')

            return res.json({ message: "Déconnexion réussie" });
        });
    } else {
        return res.status(400).json({ message: "Aucune session active" });
    }
});

// Middleware pour servir des fichiers statiques
app.use("/images", express.static(path.join(process.cwd(), "public/images"))); // Servir les images

// Middleware pour les requêtes entrantes (pour débogage, à supprimer en production)
app.use(async (req, res, next) => {
    console.log("user session", req.session.user);
    try {
        // Utilisation de `pool.query()` pour interroger la base de données
        const [rows] = await pool.promise().query("SELECT COUNT(session_id) AS session FROM sessions");
        console.log("Active sessions:", rows[0].session);  // Affiche le nombre de sessions actives
        console.log("User session:", req.session.user ? req.session : "No user session");
        next();
    } catch (err) {
        console.error("Error fetching sessions:", err.message);
        next(); // Continuer même en cas d'erreur
    }
});

// Utilisation des routes définies dans index.routes.js
app.use('/', router); 

// Démarrage du serveur
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);













import "dotenv/config"; 
import express from "express"; 
import path from "path"; 
import cors from "cors"; 
import session from "express-session"; 
import bcrypt from "bcrypt";
import { createRequire } from "module"; 
import mysql from "mysql2"; // Importation du module mysql2
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session); 

import router from "./routes/index.routes.js"; 

const app = express(); 

const PORT = process.env.PORT || 3000; 

// Middleware pour parser les données JSON et URL-encodées (placer avant les routes)
app.use(express.json()); // Middleware pour parser le JSON
app.use(express.urlencoded({ extended: false })); // Middleware pour parser les données URL-encodées

// Configuration de CORS
app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, 
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], 
        allowedHeaders: ["Content-Type"], 
    })
);

// Configuration du pool de connexions MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Limite de connexions simultanées
    queueLimit: 0
});

// Configuration des sessions
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION,  // Clé secrète pour la session
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Durée de vie de la session : 24 heures
            httpOnly: true,
            secure: false, // Changez à true en production avec HTTPS
        },
        store: new MySQLStore({
            host: process.env.DB_HOST, // Hôte de la base de données
            port: process.env.DB_PORT, // Port de la base de données
            user: process.env.DB_USER, // Utilisateur de la base de données
            password: process.env.DB_PASS, // Mot de passe de la base de données
            database: process.env.DB_NAME, // Nom de la base de données
        }),
    })
);


// Exemple d'authentification (lorsque l'utilisateur se connecte)
app.post("/login", async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: "Pseudo/Email ou mot de passe manquant" });
    }

    console.log("Reçu :", req.body);

    try {
        // Construire la requête pour rechercher l'utilisateur par pseudo ou email
        const [[user]] = await pool.promise().query(
            "SELECT * FROM user WHERE (pseudo = ? OR email = ?)",
            [identifier, identifier] // Utilisation de `identifier` pour pseudo ou email
        );

        // Vérifier si l'utilisateur existe et si le mot de passe correspond
        if (user && user.password === password) {
            req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email }; // Crée la session
            return res.json({ message: "Connexion réussie", user: req.session.user });
        }

        return res.status(401).json({ message: "Identifiants incorrects" });
    } catch (err) {
        console.error("Erreur lors de l'authentification :", err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});






// Route pour la déconnexion
app.post("/logout", (req, res) => {
    // Vérifier si une session existe
    if (req.session.user) {
        // Détruire la session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Erreur lors de la déconnexion" });
            }

            // Effacer le cookie de session
            res.clearCookie("connect.sid");  // Utilisez le nom de votre cookie de session (par défaut 'connect.sid')

            return res.json({ message: "Déconnexion réussie" });
        });
    } else {
        return res.status(400).json({ message: "Aucune session active" });
    }
});

// Middleware pour servir des fichiers statiques
app.use("/images", express.static(path.join(process.cwd(), "public/images"))); // Servir les images

// Middleware pour les requêtes entrantes (pour débogage, à supprimer en production)
app.use(async (req, res, next) => {
    console.log("user session", req.session.user);
    try {
        // Utilisation de `pool.query()` pour interroger la base de données
        const [rows] = await pool.promise().query("SELECT COUNT(session_id) AS session FROM sessions");
        console.log("Active sessions:", rows[0].session);  // Affiche le nombre de sessions actives
        console.log("User session:", req.session.user ? req.session : "No user session");
        next();
    } catch (err) {
        console.error("Error fetching sessions:", err.message);
        next(); // Continuer même en cas d'erreur
    }
});




// Route pour l'inscription d'un utilisateur
app.post("/signup", async (req, res) => {
    const { pseudo, email, password } = req.body;

    // Vérification des champs
    if (!pseudo || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérification si l'email ou le pseudo existe déjà
    try {
        const [[existingUser]] = await pool.promise().query(
            "SELECT * FROM user WHERE email = ? OR pseudo = ?", 
            [email, pseudo]
        );

        if (existingUser) {
            return res.status(400).json({ message: "Cet email ou pseudo est déjà utilisé" });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion dans la base de données
        const [result] = await pool.promise().query(
            "INSERT INTO user (pseudo, email, password, status, created_at) VALUES (?, ?, ?, ?, NOW())", 
            [pseudo, email, hashedPassword, 1]
        );
        

        // Retourner les informations de l'utilisateur créé
        return res.status(201).json({
            message: "Compte créé avec succès",
            user: {
                id: result.insertId, 
                pseudo, 
                email, 
                role: "user", 
                status: 0
            }
        });
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});
// Utilisation des routes définies dans index.routes.js
app.use('/', router); 

// Démarrage du serveur
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);
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
    author: "",
    publicationDate: "",
    source: "",
    underCategory_id: "",
    undercategory_name: "",
    category_name: "",
    image_url: ""
  });

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
      author: article.author,
      publicationDate: article.publicationDate,
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
      <h2>Dashboard</h2>

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

      <div className="articles-container">
        <h3>Liste des Articles</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Date de publication</th>
              <th>Source</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>{article.publicationDate}</td>
                  <td>{article.source}</td>
                  <td>{article.category_name}</td>
                  <td>
                    <button onClick={() => handleEditArticle(article)}>Modifier</button>
                    <button onClick={() => handleDeleteArticle(article.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
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
                <label>Auteur</label>
                <input
                  type="text"
                  name="author"
                  value={updatedArticle.author}
                  onChange={handleChangeArticle}
                />
              </div>
              <div>
                <label>Date de publication</label>
                <input
                  type="date"
                  name="publicationDate"
                  value={updatedArticle.publicationDate}
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
      </div>
    </div>
  );
};

export default Dashboard;
