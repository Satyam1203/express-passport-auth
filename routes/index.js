const router = require("express").Router();
const userRoutes = require("./users");
const loginRoutes = require("./login");
const registerRoutes = require("./register");
const routes = require("./routes");

router.use("/auth", userRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/", routes);

router.get("*", (req, res) => res.status(404).send("Not found"));

module.exports = router;
