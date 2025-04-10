const nodemailer = require("nodemailer");

// OTP generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

const sendOtpToEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "surplussmile@gmail.com", 
      pass: "tvna crtu chwk srfx"   
    }
  });

  const mailOptions = {
    from: `"NGO Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Email Verification OTP",
    html: `<p>Hello,</p>
           <p>Your verification OTP is: <b>${otp}</b></p>
           <p>It is valid for 10 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { generateOTP, sendOtpToEmail };
