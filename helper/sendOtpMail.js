const mailSender = require('../utils/mailSender');

const sendOtpEmail = async (email, otp) => {
  const title = "Password Reset OTP - Digital Detox";
  
  const body = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4CAF50;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border: 1px solid #dddddd;
      border-top: none;
      border-radius: 0 0 5px 5px;
    }
    .otp-container {
      margin: 25px 0;
      text-align: center;
    }
    .otp-code {
      font-size: 32px;
      font-weight: bold;
      color: #4CAF50;
      letter-spacing: 5px;
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      display: inline-block;
    }
    .info {
      font-size: 14px;
      margin: 20px 0;
      padding: 15px;
      background-color: #f8f8f8;
      border-radius: 5px;
      border-left: 4px solid #4CAF50;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #777777;
    }
    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #4CAF50;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Digital Detox</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
      
      <div class="otp-container">
        <div class="otp-code">${otp}</div>
      </div>
      
      <div class="info">
        <strong>Important:</strong> This OTP is valid for <strong>5 minutes</strong> only. Do not share this code with anyone.
      </div>
      
      <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
      
      <p>Thank you,<br>Team Digital Detox</p>
      
      <div class="footer">
        <p class="logo">Digital Detox</p>
        <p>Helping you find balance in a digital world</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await mailSender(email, title, body);
    console.log("Password reset OTP email sent successfully");
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err;
  }
};

module.exports = sendOtpEmail;