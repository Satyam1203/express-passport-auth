const router = require("express").Router();
const passport = require("passport");

router.post(
  "/",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
);

router.get("/", (req, res) => {
  res.send("Login here");
});

module.exports = router;
