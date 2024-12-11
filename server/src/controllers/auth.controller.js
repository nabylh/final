// import Auth from '../models/Auth.js'; // Import du modèle Auth

// // Connexion utilisateur
// const login = async (req, res) => {
//     const { identifier, password } = req.body;

//     if (!identifier || !password) {
//         return res.status(400).json({ message: "Pseudo/Email ou mot de passe manquant" });
//     }

//     try {
//         const user = await Auth.findByIdentifier(identifier);

//         if (user && await Auth.comparePassword(password, user.password)) {
//             req.session.user = { id: user.id, pseudo: user.pseudo, email: user.email, role: user.role };
//             return res.status(200).json({ message: "Connexion réussie", user: req.session.user });
//         }

//         return res.status(401).json({ message: "Identifiants incorrects" });
//     } catch (error) {
//         console.error("Erreur lors de la connexion :", error);
//         return res.status(500).json({ message: "Erreur serveur" });
//     }
// };


// // const logout = (req, res) => {
// //     // Vérification si une session existe
// //     if (req.session?.user) {
// //         req.session.destroy((err) => {
// //             if (err) {
// //                 console.error("Erreur lors de la destruction de la session :", err);
// //                 return res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
// //             }

// //             // Effacer le cookie côté client
// //             res.clearCookie("connect.sid", {
// //                 path: '/',           
// //                 httpOnly: true,     
// //                 secure: false,       
// //                 sameSite: 'strict',  
// //             });

// //             return res.status(200).json({ message: "Déconnexion réussie" });
// //         });
// //     } else {
// //         // Si aucune session active
// //         return res.status(400).json({ message: "Aucune session active à déconnecter" });
// //     }
// // };



// const signup = async (req, res) => {
//     const { pseudo, email, password } = req.body;

//     if (!pseudo || !email || !password) {
//         return res.status(400).json({ message: "Tous les champs sont requis" });
//     }

//     try {
//         const existingUser = await Auth.findByEmailOrPseudo(email, pseudo);

//         if (existingUser) {
//             return res.status(400).json({ message: "Cet email ou pseudo est déjà utilisé" });
//         }

//         const newUser = await Auth.register({ pseudo, email, password });

//         return res.status(201).json({
//             message: "Compte créé avec succès",
//             user: {
//                 id: newUser.id,
//                 pseudo: newUser.pseudo,
//                 email: newUser.email,
//                 role: newUser.role,
//                 status: newUser.status,
//             }
//         });
//     } catch (error) {
//         console.error("Erreur lors de l'inscription :", error.message);
//         return res.status(500).json({ message: "Erreur serveur" });
//     }
// };

// export {
//     login,
//     logout,
//     signup
// };
