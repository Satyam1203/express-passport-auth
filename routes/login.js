const router = require("express").Router();
const passport = require("passport");
const { checkunAuth } = require("../services/route-protection");

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.render("index", { user: req.user.name });
  }
);

router.get("/", checkunAuth, (req, res) => {
  res.send("Login here");
});

module.exports = router;
