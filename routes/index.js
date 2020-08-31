const router = require("express").Router();
const userRoutes = require("./users");

router.use("/auth", userRoutes);

module.exports = router;
