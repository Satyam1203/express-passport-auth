const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const data = profile._json;
      User.findOne({ email: data.email }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          User.create(
            {
              userId: data.sub,
              name: data.name,
              email: data.email,
            },
            (err, user) => {
              if (!err) done(null, user);
            }
          );
        }
      });
    }
  )
);
