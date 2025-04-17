const mailSender = require('../utils/mailSender');

const sendOtpEmail = async (email, otp) => {
  const title = "Password Reset OTP - Digital Detox";

  const body = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f3f3;">
      <div style="max-width: 500px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px;">
        <h2 style="color: #4CAF50;">Digital Detox - Password Reset</h2>
        <p>Hi 👋,</p>
        <p>We received a request to reset your password. Use the OTP below to proceed:</p>
        <h1 style="letter-spacing: 4px; background: #e2e2e2; padding: 10px; border-radius: 5px; text-align: center;">
          ${otp}
        </h1>
        <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
        <p>If you didn't request this, just ignore this email.</p>
        <br />
        <p style="font-size: 14px; color: gray;">Thanks,<br />Team Digital Detox</p>
      </div>
    </div>
  `;

  try {
    await mailSender(email, title, body);
  } catch (err) {
    console.error("Error sending OTP email:", err);
  }
};

module.exports = sendOtpEmail;
