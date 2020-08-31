const express = require("express");
const app = express();
const routes = require("./routes/index");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const port = process.env.PORT || 5000;

dotenv.config();
cors();

require("./models");
require("./services/passport");

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log("Server strated"));
