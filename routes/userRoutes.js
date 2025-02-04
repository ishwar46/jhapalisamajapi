const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getUserProfile);

module.exports = router;
