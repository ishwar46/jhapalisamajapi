const jwt = require("jsonwebtoken");

const verifytoken = async (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).send("Access Denied, Token Missing")
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Access Denied, Token Missing")
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(`Error in token Validation ${error}`)
        res.status(500).send("Internal Server Error")
    }
}

const authGuardAdmin = async (req, res, next) => {
    try {
        const authGuard = req.header("Authorization")
        if (!authGuard) {
            return res.status(401).send("Authorization Header Missing")
        }
        const token = authGuard.split(" ")[1];
        if (!token) {
            return res.status(401).send("Token Missing!!")
        }
        const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodetoken;

        if (req.userData.isAdmin == false) {
            return res.status(401).send("Access Denied.. You are not admin")
        }
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}


module.exports = {
    verifytoken,
    authGuardAdmin
}