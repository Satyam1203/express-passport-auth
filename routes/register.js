const router = require("express").Router();
const registerController = require("../controllers/register");
const { checkunAuth } = require("../services/route-protection");

router.post("/", registerController.createUser);

router.get("/", checkunAuth, (req, res) => res.send("Register here"));

module.exports = router;
