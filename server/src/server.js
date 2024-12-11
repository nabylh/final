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



// app.post("/login", async (req, res) => {
//     const { identifier, password } = req.body;

//     if (!identifier || !password) {
//         return res.status(400).json({ message: "Pseudo/Email ou mot de passe manquant" });
//     }

    

//     try {
//         const [[user]] = await pool.promise().query(
//             "SELECT * FROM user WHERE (pseudo = ? OR email = ?)",
//             [identifier, identifier]
//         );

//         if (user && await bcrypt.compare(password, user.password)) {
//             req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email, role: user.role };
//             return res.json({ message: "Connexion réussie", user: req.session.user });
//         }
        
//         return res.status(401).json({ message: "Identifiants incorrects" });
//     } catch (err) {
//         console.error("Erreur lors de l'authentification :", err);
//         return res.status(500).json({ message: "Erreur serveur" });
//     }
// });

app.post("/login", async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: "Pseudo/Email ou mot de passe manquant" });
    }

    try {
        const [[user]] = await pool.promise().query(
            "SELECT * FROM user WHERE (pseudo = ? OR email = ?)",
            [identifier, identifier]
        );

        if (user) {
            // Vérifiez si le mot de passe correspond
            if (await bcrypt.compare(password, user.password)) {
                req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email, role: user.role };
                return res.json({ message: "Connexion réussie", user: req.session.user });
            } else {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }
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

            
            res.clearCookie("connect.sid", {
                path: '/',           
                httpOnly: true,      
                secure: false,       //  a Passez à true en HTTPS
                sameSite: 'strict',  // Empêche l'envoi du cookie vers d'autres sites
            });
          
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


app.post('/article', async (req, res) => {
    const { title, content, source, underCategory_id, image_url } = req.body;


    if (!title || !content || !underCategory_id) {
        return res.status(400).json({ message: "Title, content, and underCategory_id are required" });
    }

    try {
       
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
   
    res.json({ message: "Bienvenue sur le tableau de bord administrateur !" });
});



app.use('/', router); 


app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);



app.post('/comments', withAuth, async (req, res) => {
    const { content, article_id } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!content || !article_id) {
        return res.status(400).json({ message: "Contenu et article_id sont requis" });
    }

    try {
    
        const userId = req.session.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        
        const defaultStatus = 'pending'; 

        
        const [result] = await pool.promise().query(
            `INSERT INTO comment (content, article_id, user_id, created_at, status) 
             VALUES (?, ?, ?, NOW(), ?)`,
            [content, article_id, userId, defaultStatus] 
        );

        
        if (result.insertId) {
            // Récupération du pseudo de l'utilisateur
            const [user] = await pool.promise().query(
                `SELECT pseudo FROM user WHERE id = ?`,
                [userId]
            );

            if (user.length > 0) {
                const pseudo = user[0].pseudo;

                res.status(201).json({
                    message: 'Commentaire créé avec succès',
                    comment: {
                        id: result.insertId,
                        content,
                        article_id,
                        user_id: userId,
                        pseudo, 
                        created_at: new Date(),
                        status: defaultStatus 
                    }
                });
            } else {
                res.status(500).json({ message: 'Utilisateur non trouvé' });
            }
        } else {
            res.status(500).json({ message: 'Échec de la création du commentaire' });
        }
    } catch (error) {
        console.error('Erreur lors de la création du commentaire:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});



// app.get('/comments/article/:articleId', async (req, res) => {
//     const { articleId } = req.params;

//     try {
//         // Requête pour récupérer les commentaires associés à l'article
//         const [comments] = await pool.promise().query(
//             `SELECT c.id, c.content, c.created_at, c.status, u.pseudo 
//              FROM comment c
//              JOIN user u ON c.user_id = u.id
//              WHERE c.article_id = ? 
//              ORDER BY c.created_at DESC`,
//             [articleId]
//         );

//         if (comments.length > 0) {
//             res.status(200).json({ comments });
//         } else {
//             res.status(404).json({ message: 'Aucun commentaire trouvé pour cet article' });
//         }
//     } catch (error) {
//         console.error('Erreur lors de la récupération des commentaires:', error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// });

app.get('/comments', async (req, res) => {
    try {
      const [comments] = await pool.promise().query(
        `SELECT c.id, c.content, c.created_at, c.status, u.pseudo, c.article_id 
         FROM comment c
         JOIN user u ON c.user_id = u.id
         ORDER BY c.created_at DESC`
      );
  
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'Aucun commentaire trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  


app.put('/comments/:commentId', withAuth, async (req, res) => {
    const { commentId } = req.params; // ID du commentaire à modifier
    const { content } = req.body; // Nouveau contenu du commentaire


    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
    }


    if (!content) {
        return res.status(400).json({ message: "Le contenu est requis pour modifier un commentaire" });
    }


    try {
        const userId = req.session.user.id; 
        const userRole = req.session.user.role; 

       
        const [[existingComment]] = await pool.promise().query(
            `SELECT user_id FROM comment WHERE id = ?`,
            [commentId]
        );

        if (!existingComment) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }


        if (existingComment.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier ce commentaire" });
        }

        // Mise à jour du commentaire
        const [result] = await pool.promise().query(
            `UPDATE comment SET content = ?, created_at = NOW() WHERE id = ?`,
            [content, commentId]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Commentaire modifié avec succès" });
        } else {
            return res.status(500).json({ message: "Échec de la modification du commentaire" });
        }
    } catch (error) {
        console.error("Erreur lors de la modification du commentaire:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route pour supprimer un commentaire existant
app.delete('/comments/:commentId', withAuth, async (req, res) => {
    const { commentId } = req.params; // ID du commentaire à supprimer

    // Vérifier que l'utilisateur est connecté
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
    }

    try {
        const userId = req.session.user.id; // ID de l'utilisateur connecté
        const userRole = req.session.user.role; // Rôle de l'utilisateur connecté

        // Vérifier que le commentaire existe et récupérer son auteur
        const [[existingComment]] = await pool.promise().query(
            `SELECT user_id FROM comment WHERE id = ?`,
            [commentId]
        );

        if (!existingComment) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }

       
        if (existingComment.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer ce commentaire" });
        }

        
        const [result] = await pool.promise().query(
            `DELETE FROM comment WHERE id = ?`,
            [commentId]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Commentaire supprimé avec succès" });
        } else {
            return res.status(500).json({ message: "Échec de la suppression du commentaire" });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});


