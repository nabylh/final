

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
