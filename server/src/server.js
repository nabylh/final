import "dotenv/config"; 
import express from "express"; 
import path from "path"; 
import cors from "cors"; 
import session from "express-session"; 
import bcrypt from "bcrypt";
import { createRequire } from "module"; 
import mysql from "mysql2"; // Importation du module mysql2
import withAdminAuth from "./middlewares/withAdminAuth.js"; // Middleware pour l'authentification des admins
import withAuth from "./middlewares/withAuth.js";

const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

import router from "./routes/index.routes.js"; 

const app = express(); 

const PORT = process.env.PORT || 3000; 

// Middleware pour parser les données JSON et URL-encodées
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuration de CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
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
    connectionLimit: 10,
    queueLimit: 0
});

// Configuration des sessions
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 24 heures
            httpOnly: true,
            secure: false,
        },
        store: new MySQLStore({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
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
        const [[user]] = await pool.promise().query(
            "SELECT * FROM user WHERE (pseudo = ? OR email = ?)",
            [identifier, identifier]
        );

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email, role: user.role };
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
    if (req.session?.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Erreur lors de la destruction de la session :", err);
                return res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
            }

            // Effacer le cookie côté client
            res.clearCookie("connect.sid", {
                path: '/',           // S'assurer que le chemin est bien défini
                httpOnly: true,      // Garantir que le cookie est inaccessible via JavaScript
                secure: false,       // Passez à true en HTTPS
                sameSite: 'strict',  // Empêche l'envoi du cookie vers d'autres sites
            });
            console.log("Session détruite avec succès.");
            return res.status(200).json({ message: "Déconnexion réussie" });
        });
    } else {
        // Si aucune session active
        return res.status(400).json({ message: "Aucune session active à déconnecter" });
    }
});


// Middleware pour servir des fichiers statiques
app.use("/images", express.static(path.join(process.cwd(), "public/images")));

// Route pour l'inscription d'un utilisateur
app.post("/signup", async (req, res) => {
    const { pseudo, email, password } = req.body;

    if (!pseudo || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        const [[existingUser]] = await pool.promise().query(
            "SELECT * FROM user WHERE email = ? OR pseudo = ?", 
            [email, pseudo]
        );

        if (existingUser) {
            return res.status(400).json({ message: "Cet email ou pseudo est déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.promise().query(
            "INSERT INTO user (pseudo, email, password, status, created_at) VALUES (?, ?, ?, ?, NOW())", 
            [pseudo, email, hashedPassword, 1]
        );

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

// Exemple de mise à jour de l'article dans votre serveur Node.js
app.put('/article/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, source, underCategory_id, image_url } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!title || !content || !underCategory_id) {
        return res.status(400).json({ message: "Title, content, and underCategory_id are required" });
    }

    try {
        const [result] = await pool.promise().query(
            `UPDATE article 
             SET title = ?, content = ?, source = ?, underCategory_id = ?, image_url = ? 
             WHERE id = ?`,
            [title, content, source, underCategory_id, image_url, id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Article updated successfully' });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route pour créer un nouvel article
app.post('/article', async (req, res) => {
    const { title, content, source, underCategory_id, image_url } = req.body;

    // Vérification des champs requis
    if (!title || !content || !underCategory_id) {
        return res.status(400).json({ message: "Title, content, and underCategory_id are required" });
    }

    try {
        // Requête d'insertion de l'article dans la base de données
        const [result] = await pool.promise().query(
            `INSERT INTO article (title, content, source, underCategory_id, image_url, created_at) 
             VALUES (?, ?, ?, ?, ?, NOW())`,
            [title, content, source, underCategory_id, image_url]
        );

        // Si l'insertion est réussie
        if (result.insertId) {
            res.status(201).json({ 
                message: 'Article created successfully',
                article: {
                    id: result.insertId,
                    title,
                    content,
                    source,
                    underCategory_id,
                    image_url
                }
            });
        } else {
            res.status(500).json({ message: 'Failed to create the article' });
        }
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Route protégée accessible uniquement pour les administrateurs
app.get("/dashboard", withAdminAuth, (req, res) => {
    console.log("Accès à la route /dashboard autorisé, route atteinte avec succès.");
    res.json({ message: "Bienvenue sur le tableau de bord administrateur !" });
});


// Utilisation des routes définies dans index.routes.js
app.use('/', router); 

// Démarrage du serveur
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);


// Route pour créer un nouveau commentaire (protégée)
app.post('/comments', withAuth, async (req, res) => {
    console.log("Données reçues :", req.body); // Vérifie le contenu reçu
  
    try {
      const { content, article_id } = req.body;
  
      // Vérifier que tous les champs requis sont présents
      if (!content || !article_id) {
        console.log("Contenu ou article_id manquant");
        return res.status(400).json({ message: "Contenu et article_id sont requis" });
      }
  
      // Log avant d'exécuter la requête pour voir ce qui est envoyé
      console.log("Tentative d'insertion du commentaire :", content, article_id, req.session.user.id);
  
      // Requête d'insertion dans la base de données
      const [result] = await pool.promise().query(
        `INSERT INTO comment (content, article_id, user_id, created_at) 
         VALUES (?, ?, ?, NOW())`,
        [content, article_id, req.session.user.id] // Utilisation de l'ID de l'utilisateur de la session
      );
  
      if (result.insertId) {
        console.log("Commentaire inséré avec succès");
        res.status(201).json({ 
          message: 'Commentaire créé avec succès',
          comment: {
            id: result.insertId,
            content,
            article_id,
            user_id: req.session.user.id,
            created_at: new Date()
          }
        });
      } else {
        console.log("Échec de l'insertion du commentaire");
        res.status(500).json({ message: 'Échec de la création du commentaire' });
      }
    } catch (error) {
      console.error('Erreur lors de la création du commentaire:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  