// controllers/logoutController.js


export const logout = (req, res) => {
    if (req.session?.user) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Erreur lors de la destruction de la session :", err);
                return res.status(500).json({ message: "Erreur serveur lors de la déconnexion" });
            }

            // Supprime le cookie côté client
            res.clearCookie("connect.sid", {
                path: '/',
                httpOnly: true,
                secure: false, // Mettez à true si vous utilisez HTTPS
                sameSite: 'strict',
            });

            return res.status(200).json({ message: "Déconnexion réussie" });
        });
    } else {
        // Aucun utilisateur connecté
        return res.status(400).json({ message: "Aucune session active à déconnecter" });
    }
};
