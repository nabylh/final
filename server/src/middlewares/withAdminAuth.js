export default function withAdminAuth(req, res, next) {
   

    if (req.session?.user && req.session.user.role === 'admin') {
       
        return next(); // Autorise l'accès à la route
    }

    
    return res.status(403).json({ message: "Accès interdit. Vous n'avez pas les autorisations nécessaires." });
}



