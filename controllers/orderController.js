const sgMail = require("@sendgrid/mail");
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  resetPwd: async function (req, res) {
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
