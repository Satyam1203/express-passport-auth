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
    try {
      email = req.body.email;
      console.log(req.body);

      User.findOne({ email }, async (err, user) => {
        if (err || !user) {
          return res.json({ message: "User doesn't exist" });
        } else if (user.password === undefined) {
          return res.json({
            message: "This user can only login through Google",
          });
        } else {
          const newPassword = String(Math.floor(Math.random() * Math.pow(10, 8)));
          const hashedPwd = await bcrypt.hash(newPassword, 10);

          User.findOneAndUpdate(
            { email },
            { password: hashedPwd },
            (err, user) => {
              if (err || !user) {
                return res.json({ message: "Unexpected Error occured" });
              } else {
                const msg = {
                  to: `${email}`,
                  from: "admin@node-auth.app",
                  subject: "New Password for Auth App",
                  html: `
                  <h2>Hello ${user.name}</h2>
                  <p>As you clicked on forgot password, we generated a new one for you.</p>
                  <br />
                  <p>Email : Your registered email id</p>
                  <p>Password: ${newPassword}</p>
                `,
                };
                if (sgMail.send(msg))
                  return res.json({
                    sentSuccess: true,
                    message:
                      "If the email was valid, you'll receive a mail with new password.",
                  });
              }
            }
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
};
