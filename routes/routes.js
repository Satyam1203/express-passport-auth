const { checkAuth, checkunAuth } = require("../services/route-protection");
const router = require("express").Router();
const passwordController = require("../controllers/password");


// Password handling routes
router.post("/reset-pwd", checkAuth, passwordController.resetPwd);
router.post("/forgot-pwd", passwordController.forgotPwd);

// Login Logout routes
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get("/sign-in", checkunAuth, (req, res) => res.render("login"));

// Home route
router.get("/home", checkAuth, (req, res) =>
  res.render("index", { user: req.user.name })
);
router.get("/", (req, res) => res.redirect("/login"));

module.exports = router;
