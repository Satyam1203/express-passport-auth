const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password === undefined) {
          return done(null, false, { msg: "Error" });
        }
        if (bcrypt.compareSync(password, user.password)) done(null, user);
        else done(null, false);
      });
    }
  )
);
