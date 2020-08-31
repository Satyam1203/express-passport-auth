const { checkAuth } = require("../services/route-protection");
const router = require("express").Router();

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get("/sign-in", (req, res) => res.render("login"));
router.get("/home", checkAuth, (req, res) =>
  res.render("index", { user: req.user.name })
);
router.get("/", (req, res) => res.redirect("/login"));

module.exports = router;
