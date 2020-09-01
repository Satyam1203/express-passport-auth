const User = require("../models/users");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  resetPwd: async function (req, res) {
    try {
      const email = req.user.email;
      const password = req.body.password;
      const newPassword = req.body.newPassword;

      console.log(req.body);
      User.findOne({ email }, async (err, user) => {
        if (err || !user) {
          return res.json({ message: "User doesn't exist" });
        } else if (user.password === undefined) {
          return res.json({
            message: "This user can only login through Google",
          });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            const hashedPwd = await bcrypt.hash(newPassword, 10);
            User.findOneAndUpdate(
              { email },
              { password: hashedPwd },
              (err, user) => {
                if (err || !user) {
                  return res.json({ message: "Unexpected Error occured" });
                } else {
                  return res.json({ message: "Password changed Successfully" });
                }
              }
            );
          } else {
            return res.json({ message: "Invalid current password" });
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  forgotPwd: async function (req, res) {
    console.log(req.body);
    const msg = {
      to: ``,
      from: "admin@node-auth.app",
      subject: "Login",
      html: `
              Hello
            `,
    };
    if (sgMail.send(msg)) res.json({ sentSuccess: true });
  },
};
