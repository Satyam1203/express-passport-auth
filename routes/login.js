const router = require("express").Router();
const passport = require("passport");
const { checkunAuth } = require("../services/route-protection");

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/sign-in",
  }),
  (req, res) => {
    res.redirect("/home");
  }
);

router.get("/", checkunAuth, (req, res) => res.redirect("/sign-in"));

module.exports = router;
