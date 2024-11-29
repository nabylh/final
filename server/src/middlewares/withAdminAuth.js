export default function withAdminAuth(req, res, next) {
    console.log("Middleware vérification de l'authentification admin en cours...");

    if (req.session?.user && req.session.user.role === 'admin') {
        console.log("Utilisateur authentifié en tant qu'admin :", req.session.user);
        return next(); // Autorise l'accès à la route
    }

    console.log("Accès refusé : l'utilisateur n'est pas admin ou non authentifié.");
    return res.status(403).json({ message: "Accès interdit. Vous n'avez pas les autorisations nécessaires." });
}



