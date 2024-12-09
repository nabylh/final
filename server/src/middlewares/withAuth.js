export default (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Veuillez vous connecter pour accéder à cette page." });
    }
    next();
};