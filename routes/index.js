const router = require("express").Router();
const userRoutes = require("./users");
const loginRoutes = require("./login");
const registerRoutes = require("./register");

router.use("/auth", userRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);

module.exports = router;
