const router = require("express").Router();
const userRoutes = require("./users");
const loginRoutes = require("./login");
const registerRoutes = require("./register");
const logoutRoute = require("./logout");

router.use("/auth", userRoutes);
router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.use("/", (req, res) => res.redirect("/login"));
router.use("*", (req, res) => res.status(404).send("Not found"));

module.exports = router;
