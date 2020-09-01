const express = require("express");
const app = express();
const routes = require("./routes/index");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

dotenv.config();
cors();

require("./models");
require("./services/passport");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
