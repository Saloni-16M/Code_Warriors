
// sending email to the resort that ngo has accepted the donation with the ngo details and to start preparing for the pickup packages..
const nodemailer = require("nodemailer");

const sendEmailToResort = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "surplussmile@gmail.com",
      pass:  "tvna crtu chwk srfx"   ,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailToResort;