const adminAuth = (req, res, next) => {
    console.log("Admin authorization middleware executed!");
    const token = "xyz";
    const isAdminAuthenticated = token === "xyz";
    if (!isAdminAuthenticated) {
        res.status(401).send("Unauthorized access!");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User authorization middleware executed!");
    const token = "xyz";
    const isUserAuthenticated = token === "xyz";
    if (!isUserAuthenticated) {
        res.status(401).send("Unauthorized access!");
    } else {
        next();
    }
};

module.exports = { adminAuth , userAuth };