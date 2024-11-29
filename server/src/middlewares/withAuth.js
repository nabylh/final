export default  (req, res, next) => {
    console.log("middleware USER !!!", req.session);

    if (req.session.user && req.session.user.role === "user") {
        return next();
    }

    res.status(401).json({ msg: "Unauthorized" });
};