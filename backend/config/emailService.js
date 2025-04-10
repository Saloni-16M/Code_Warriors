const nodemailer = require("nodemailer");

// Create a transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surplussmile@gmail.com", // Your email address
    pass: "tvna crtu chwk srfx", // App password (use App Password, not your actual password)
  },
});

/**
 * Sends an email with login credentials.
 * @param {string} toEmail - Recipient's email
 * @param {string} loginId - The login ID (email)
 * @param {string} password - The generated password
 */
const sendApprovalEmailResort = async (toEmail, loginId, password) => {
  try {
    const mailOptions = {
      from: '"Resort Approval Team" <surplussmile@gmail.com>', // Use a clear sender name
      to: toEmail,
      subject: "Resort Registration Approved - Your Login Credentials",
      text: `
Dear Resort Owner,

Congratulations! Your resort registration has been approved.

Your login details:
- Login ID: ${loginId}
- Password: ${password}

You can now access your account. If you need any assistance, feel free to contact us.

Best regards,  
Resort Approval Team
      `,
      html: `
        <p>Dear Resort Owner,</p>
        <p>Congratulations! Your resort registration has been approved.</p>
        <p><strong>Your login details:</strong></p>
        <ul>
          <li><strong>Login ID:</strong> ${loginId}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>You can now access your account.</p>
        <p>If you need any assistance, feel free to contact us.</p>
        <p>Best regards,<br><strong>Resort Approval Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Approval email sent to:", toEmail);
  } catch (error) {
    console.error("Error sending approval email:", error);
  }
};

module.exports = sendApprovalEmailResort;
