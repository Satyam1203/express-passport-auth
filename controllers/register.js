const User = require("../models/users");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async function (req, res) {
    try {
      console.log(req.body);
      const password = await bcrypt.hash(req.body.password, 10);
      const name = req.body.name;
      const email = req.body.email;

      const user = await User.findOne({ email });
      if (user) {
        return res.json({ message: "User with this email already exists" });
      } else {
        User.create({ name, email, password }, (err, user) => {
          if (err) console.log(err);
          if (!user) {
            res.json({
              message: "Failed registering",
            });
          } else {
            res.json({ message: "Register Success", email: user.email });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
