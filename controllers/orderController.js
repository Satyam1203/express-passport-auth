const sgMail = require("@sendgrid/mail");
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  makeOrder: async function (req, res) {
    console.log(req.body);
    const msg = {
      to: process.env.TOMAIL,
      from: "admin@bragbakers.app",
      subject: "Food Ordered",
      html: `
              <h2>Hello admin,</h2><br/>
              <p>${req.body.name} ordered ${req.body.units} unit(s) of ${req.body.product}.</p>
              <strong>Total Bill - ${req.body.price}</strong>
              <p>Address: ${req.body.address}</p>
              <p>Mobile: ${req.body.phone}
            `,
    };
    if (sgMail.send(msg)) res.json({ sentSuccess: true });
  },
};
