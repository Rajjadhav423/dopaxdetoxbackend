const mailSender = require('../utils/mailSender');

const sendOtpEmail = async (email, otp) => {
  // Ensure OTP is exactly 6 digits
  const formattedOtp = otp.toString().padStart(6, '0').slice(0, 6);
  const title = "Password Reset OTP - Digital Detox";
  
  const body = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    body {
      font-family: 'Poppins', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .header-logo {
      margin-bottom: 10px;
    }
    .header-logo img {
      height: 60px;
      width: auto;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .header p {
      color: rgba(255,255,255,0.9);
      margin: 5px 0 0;
      font-size: 16px;
    }
    .content {
      background-color: #ffffff;
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .otp-container {
      margin: 30px auto;
      text-align: center;
      padding: 10px;
    }
    .otp-title {
      font-size: 18px;
      color: #555;
      margin-bottom: 15px;
    }
    .otp-wrapper {
      display: inline-block;
      background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
      padding: 5px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .otp-code {
      display: flex;
      justify-content: center;
    }
    .otp-digit {
      display: inline-block;
      width: 45px;
      height: 60px;
      line-height: 60px;
      font-size: 32px;
      font-weight: 700;
      color: #333;
      background-color: white;
      margin: 0 3px;
      border-radius: 8px;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }
    .info {
      font-size: 14px;
      margin: 25px 0;
      padding: 15px;
      background-color: #f8f8f8;
      border-radius: 8px;
      border-left: 4px solid #4CAF50;
      display: flex;
      align-items: center;
    }
    .info-icon {
      margin-right: 10px;
      color: #4CAF50;
      font-size: 24px;
    }
    .timer-icon {
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
    }
    .cta-button {
      display: block;
      text-align: center;
      margin: 30px auto;
    }
    .cta-button a {
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 8px rgba(76,175,80,0.3);
      transition: all 0.3s ease;
    }
    .cta-button a:hover {
      background-color: #3e8e41;
      box-shadow: 0 6px 12px rgba(76,175,80,0.4);
    }
    .divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 30px 0;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #777777;
      background-color: #f9f9f9;
    }
    .footer-logo {
      font-size: 20px;
      font-weight: bold;
      color: #4CAF50;
      margin-bottom: 10px;
    }
    .social-links {
      margin: 15px 0;
    }
    .social-icon {
      display: inline-block;
      margin: 0 5px;
      width: 32px;
      height: 32px;
      background-color: #4CAF50;
      border-radius: 50%;
      line-height: 32px;
      text-align: center;
    }
    .copyright {
      margin-top: 15px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">
        <!-- Using a placeholder for the logo - replace with actual logo URL -->
        <img src="https://i.ibb.co/vd8Dw4v/digital-detox-logo.png" alt="Digital Detox" onerror="this.style.display='none'">
      </div>
      <h1>Digital Detox</h1>
      <p>Your journey to digital wellbeing</p>
    </div>
    
    <div class="content">
      <p class="greeting">Hello there,</p>
      
      <p>We received a request to reset your password for your Digital Detox account. Please use the verification code below to complete the process:</p>
      
      <div class="otp-container">
        <p class="otp-title">Your Verification Code</p>
        <div class="otp-wrapper">
          <div class="otp-code">
            ${formattedOtp.split('').map(digit => `<div class="otp-digit">${digit}</div>`).join('')}
          </div>
        </div>
      </div>
      
      <div class="info">
        <div class="info-icon">⏱️</div>
        <div>
          <strong>Important:</strong> This verification code is valid for <strong>5 minutes</strong> only. For security reasons, please do not share this code with anyone.
        </div>
      </div>
      
      <div class="cta-button">
        <a href="https://digitaldetox.app/reset-password" target="_blank">Reset Password</a>
      </div>
      
      <p>If you didn't request a password reset, please ignore this email or contact our support team immediately if you have any concerns.</p>
      
      <div class="divider"></div>
      
      <p>Thank you for being part of our community,<br><strong>Team Digital Detox</strong></p>
    </div>
    
    <div class="footer">
      <div class="footer-logo">
        Digital Detox
      </div>
      <p>Helping you find balance in a digital world</p>
      
      <div class="social-links">
        <!-- Social media icons (using placeholder characters) -->
        <span class="social-icon">f</span>
        <span class="social-icon">t</span>
        <span class="social-icon">in</span>
        <span class="social-icon">ig</span>
      </div>
      
      <p>If you have any questions, contact us at <a href="mailto:support@digitaldetox.app">support@digitaldetox.app</a></p>
      
      <p class="copyright">© 2025 Digital Detox. All rights reserved.</p>
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