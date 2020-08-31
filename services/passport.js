const passport = require("passport");
const User = require("../models/users");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

require("./passport-google");
require("./passport-local");
