const mailSender = require('../utils/mailSender');

const sendOtpEmail = async (email, otp, name) => {
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
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Nunito', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .header {
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
      padding: 35px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: "";
      position: absolute;
      top: -25px;
      left: -25px;
      width: 150px;
      height: 150px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
    }
    
    .header::after {
      content: "";
      position: absolute;
      bottom: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
    }
    
    .header-logo {
      position: relative;
      z-index: 2;
      margin-bottom: 15px;
    }
    
    .header h1 {
      color: white;
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 0.5px;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header p {
      color: rgba(255,255,255,0.9);
      margin: 8px 0 0;
      font-size: 18px;
      position: relative;
      z-index: 2;
    }
    
    .content {
      background-color: #ffffff;
      padding: 40px 30px;
      position: relative;
    }
    
    .wave-divider {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }
    
    .wave-divider svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 28px;
      transform: rotateY(180deg);
    }
    
    .wave-divider .shape-fill {
      fill: #8b5cf6;
    }
    
    .greeting {
      font-size: 20px;
      margin-bottom: 20px;
      color: #4f46e5;
      font-weight: 700;
    }
    
    p {
      margin-bottom: 20px;
      font-size: 16px;
      color: #4b5563;
    }
    
    .highlight {
      color: #4f46e5;
      font-weight: 600;
    }
    
    .otp-container {
      margin: 35px auto;
      text-align: center;
      padding: 10px;
      background: rgba(99, 102, 241, 0.03);
      border-radius: 16px;
    }
    
    .otp-title {
      font-size: 18px;
      color: #4b5563;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    .otp-wrapper {
      display: inline-block;
      padding: 20px;
      border-radius: 16px;
      background: linear-gradient(135deg, #f5f7ff 0%, #e0e7ff 100%);
      box-shadow: 0 8px 15px rgba(99, 102, 241, 0.15);
    }
    
    .otp-code {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      max-width: 100%;
    }
    
    .otp-digit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 60px;
      font-size: 32px;
      font-weight: 800;
      color: #4f46e5;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(99, 102, 241, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);
      position: relative;
      overflow: hidden;
      margin: 2px;
    }
    
    .otp-digit::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
    }
    
    .info {
      font-size: 15px;
      margin: 30px 0;
      padding: 20px;
      background-color: #eff6ff;
      border-radius: 12px;
      border-left: 5px solid #6366f1;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);
    }
    
    .info-icon {
      margin-right: 15px;
      color: #6366f1;
      font-size: 24px;
      background: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(99, 102, 241, 0.15);
      flex-shrink: 0;
    }
    
    .cta-button {
      display: block;
      text-align: center;
      margin: 35px auto;
    }
    
    .cta-button a {
      display: inline-block;
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 0 8px 15px rgba(99, 102, 241, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .cta-button a::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
      transition: all 0.6s ease;
    }
    
    .cta-button a:hover::before {
      left: 100%;
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.2) 50%, rgba(99, 102, 241, 0.05) 100%);
      margin: 30px 0;
    }
    
    .signature {
      font-style: italic;
      font-weight: 600;
      color: #4f46e5;
    }
    
    .footer {
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      background: linear-gradient(135deg, #f5f7ff 0%, #e0e7ff 100%);
      position: relative;
    }
    
    .footer-wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      transform: rotate(180deg);
    }
    
    .footer-wave svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 28px;
    }
    
    .footer-wave .shape-fill {
      fill: #FFFFFF;
    }
    
    .footer-logo {
      font-size: 24px;
      font-weight: 800;
      color: #4f46e5;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 6px;
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(99, 102, 241, 0.15);
      font-size: 16px;
      color: #6366f1;
      transition: all 0.3s ease;
    }
    
    .contact-link {
      color: #6366f1;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px dashed #6366f1;
    }
    
    .copyright {
      margin-top: 20px;
      font-size: 13px;
      color: #9ca3af;
    }
    
    @media only screen and (max-width: 500px) {
      .container {
        border-radius: 0;
        margin-top: 0;
        margin-bottom: 0;
      }
      
      .content {
        padding: 30px 20px;  
      }
      
      .otp-digit {
        width: 40px;
        height: 50px;
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="white" fill-opacity="0.95"/>
          <path d="M25 28L55 28" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
          <path d="M30 40L50 40" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
          <path d="M35 52L45 52" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
        </svg>
      </div>
      <h1>Digital Detox</h1>
      <p>Your journey to digital wellbeing</p>
    </div>
    
    <div class="content">
      <div class="wave-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>
      
      <p class="greeting">Hello ${name || 'there'},</p>
      
      <p>We received a request to reset your password for your <span class="highlight">Digital Detox</span> account. Please use the verification code below to complete the process:</p>
      
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
          <strong>Important Notice:</strong> This verification code is valid for <strong>5 minutes</strong> only. For security reasons, please do not share this code with anyone.
        </div>
      </div>
      
      <div class="cta-button">
        <a href="https://digitaldetox.app/reset-password" target="_blank">Reset Password</a>
      </div>
      
      <p>If you didn't request a password reset, please ignore this email or contact our support team immediately if you have any concerns about your account security.</p>
      
      <div class="divider"></div>
      
      <p>Thank you for being part of our community,<br><span class="signature">Team Digital Detox</span></p>
    </div>
    
    <div class="footer">
      <div class="footer-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>
      
      <div class="footer-logo">
        Digital Detox
      </div>
      <p>Helping you find balance in a digital world</p>
      
      <div class="social-links">
        <span class="social-icon">f</span>
        <span class="social-icon">t</span>
        <span class="social-icon">in</span>
        <span class="social-icon">ig</span>
      </div>
      
      <p>Questions or concerns? Contact us at <a href="mailto:support@digitaldetox.app" class="contact-link">support@digitaldetox.app</a></p>
      
      <p class="copyright">© 2025 Digital Detox. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await mailSender(email, title, body);
    console.log("Password reset OTP email sent successfully");
    return true;
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err;
  }
};

module.exports = sendOtpEmail;