const nodemailer = require("nodemailer");

// Creating a transporter with  email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surplussmile@gmail.com", 
    pass: "tvna crtu chwk srfx", 
  },
});

/**
 * Sends an email with login credentials.
 * @param {string} toEmail - Recipient's email
 * @param {string} loginId - The login ID (email)
 * @param {string} password - The generated password
 */
const sendApprovalEmail = async (toEmail, loginId, password) => {
  try {
    const mailOptions = {
      from: '"NGO Support Team" <your-email@gmail.com>',
      to: toEmail,
      subject: "Your NGO Account Details",
      text: `
Dear NGO Representative,

Your NGO registration has been successfully processed.

Login ID: ${loginId}
Password: ${password}

You can now access your account on our platform. 

If you need any assistance, feel free to reach out.

Best regards,
NGO Support Team
      `,
      html: `
        <p>Dear NGO Representative,</p>
        <p>Your NGO registration has been successfully processed.</p>
        <p><strong>Login ID:</strong> ${loginId}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can now access your account on our platform.</p>
        <p>If you need any assistance, feel free to reach out.</p>
        <p>Best regards,<br>NGO Support Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Approval email sent to:", toEmail);
  } catch (error) {
    console.error("Error sending approval email:", error);
  }
};

module.exports = sendApprovalEmail;
