/**
 * Generates a premium warm-dark themed HTML email template for OTP verification.
 * @param otp - The 4-digit verification code.
 * @returns HTML string for nodemailer
 */
export const getOtpEmailTemplate = (otp: string): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Chatly Account</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #0f0b09;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #f3ede8;
        -webkit-font-smoothing: antialiased;
      }
      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #0f0b09;
        padding: 40px 0;
      }
      .container {
        max-width: 480px;
        margin: 0 auto;
        background-color: #17120f;
        border: 1px solid #2e221b;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
      }
      .header {
        padding: 40px 40px 20px 40px;
        text-align: center;
      }
      .logo-circle {
        display: inline-block;
        width: 56px;
        height: 56px;
        background-color: rgba(224, 122, 95, 0.1);
        border: 1px solid rgba(224, 122, 95, 0.25);
        border-radius: 14px;
        margin-bottom: 16px;
      }
      .logo-icon {
        color: #e07a5f;
        font-size: 26px;
        line-height: 56px;
        font-weight: bold;
      }
      .title {
        color: #e07a5f;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin: 0 0 8px 0;
      }
      .subtitle {
        color: #a39084;
        font-size: 13px;
        margin: 0;
      }
      .content {
        padding: 0 40px 30px 40px;
        text-align: center;
      }
      .divider {
        height: 1px;
        background-color: #2e221b;
        margin: 20px 0 30px 0;
      }
      .instruction {
        font-size: 15px;
        line-height: 1.6;
        color: #d1c3ba;
        margin-bottom: 30px;
      }
      .otp-box {
        background-color: #211915;
        border: 1px dashed #e07a5f;
        border-radius: 12px;
        padding: 20px;
        margin: 0 auto 30px auto;
        max-width: 240px;
      }
      .otp-code {
        font-size: 36px;
        font-weight: 800;
        letter-spacing: 12px;
        color: #e07a5f;
        /* compensation for trailing letter-spacing */
        padding-left: 12px; 
        margin: 0;
      }
      .expiry-notice {
        font-size: 12px;
        color: #8c786c;
        line-height: 1.5;
        margin: 0;
      }
      .footer {
        padding: 30px 40px 40px 40px;
        text-align: center;
        background-color: #120e0c;
        border-top: 1px solid #1c1512;
      }
      .footer-text {
        font-size: 11px;
        color: #69574d;
        line-height: 1.6;
        margin: 0 0 8px 0;
      }
      .footer-link {
        color: #e07a5f;
        text-decoration: none;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        
        <!-- Header -->
        <div class="header">
          <div class="logo-circle">
            <span class="logo-icon">&#x1F4AC;</span>
          </div>
          <h1 class="title">Chatly</h1>
          <p class="subtitle">Secure Verification Code</p>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="divider"></div>
          <p class="instruction">
            Hello, <br>
            Thank you for choosing Chatly. Use the verification code below to complete your registration process.
          </p>
          
          <div class="otp-box">
            <h2 class="otp-code">${otp}</h2>
          </div>

          <p class="expiry-notice">
            This verification code is valid for <strong>1 minutes</strong>.<br>
            If you did not request this, please ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p class="footer-text">
            &copy; ${new Date().getFullYear()} Chatly App. All rights reserved.
          </p>
          <p class="footer-text">
            Elevating communication with warm dark aesthetics.
          </p>
        </div>

      </div>
    </div>
  </body>
  </html>
  `;
};



export const getPasswordChangedEmailTemplate = (email: string): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed - Chatly</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
        color: #333333;
        -webkit-font-smoothing: antialiased;
      }
      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #f5f5f5;
        padding: 40px 0;
      }
      .container {
        max-width: 520px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .header {
        padding: 48px 40px 32px 40px;
        text-align: center;
        border-bottom: 1px solid #f0f0f0;
      }
      .logo-circle {
        display: inline-block;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
      }
      .logo-icon {
        color: #ffffff;
        font-size: 28px;
      }
      .brand-name {
        color: #1f2937;
        font-size: 22px;
        font-weight: 700;
        margin: 0 0 4px 0;
        letter-spacing: -0.5px;
      }
      .header-subtitle {
        color: #6b7280;
        font-size: 13px;
        margin: 0;
        font-weight: 500;
      }
      .content {
        padding: 40px 40px;
      }
      .greeting {
        font-size: 16px;
        line-height: 1.5;
        color: #374151;
        margin: 0 0 24px 0;
      }
      .success-badge {
        display: inline-block;
        background-color: #dcfce7;
        border: 1px solid #bbf7d0;
        border-radius: 6px;
        padding: 12px 16px;
        margin: 24px 0;
        text-align: center;
      }
      .success-text {
        color: #166534;
        font-size: 14px;
        font-weight: 600;
        margin: 0;
      }
      .info-block {
        background-color: #f3f4f6;
        border-left: 4px solid #2563eb;
        border-radius: 4px;
        padding: 16px;
        margin: 24px 0;
      }
      .info-label {
        color: #6b7280;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 6px 0;
      }
      .info-value {
        color: #1f2937;
        font-size: 15px;
        font-weight: 500;
        margin: 0;
        word-break: break-all;
      }
      .security-section {
        background-color: #fef3c7;
        border: 1px solid #fde68a;
        border-radius: 6px;
        padding: 16px;
        margin: 24px 0;
      }
      .security-title {
        color: #92400e;
        font-size: 13px;
        font-weight: 700;
        margin: 0 0 8px 0;
      }
      .security-text {
        color: #78350f;
        font-size: 13px;
        line-height: 1.6;
        margin: 0;
      }
      .action-text {
        font-size: 13px;
        color: #6b7280;
        line-height: 1.6;
        margin: 24px 0 0 0;
      }
      .footer {
        padding: 32px 40px;
        text-align: center;
        background-color: #f9fafb;
        border-top: 1px solid #f0f0f0;
      }
      .footer-text {
        font-size: 12px;
        color: #9ca3af;
        line-height: 1.6;
        margin: 0 0 6px 0;
      }
      .footer-links {
        font-size: 12px;
        color: #2563eb;
      }
      .footer-links a {
        color: #2563eb;
        text-decoration: none;
      }
      .footer-links a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        
        <!-- Header -->
        <div class="header">
          <div class="logo-circle">
            <span class="logo-icon">🔒</span>
          </div>
          <h1 class="brand-name">Chatly</h1>
          <p class="header-subtitle">Security Update</p>
        </div>

        <!-- Content -->
        <div class="content">
          <p class="greeting">Hi there,</p>
          
          <div class="success-badge">
            <p class="success-text">✓ Password Successfully Changed</p>
          </div>

          <p class="greeting">
            The password for your Chatly account has been successfully updated.
          </p>

          <div class="info-block">
            <p class="info-label">Account Email</p>
            <p class="info-value">${email}</p>
          </div>

          <div class="security-section">
            <p class="security-title">⚠️ Didn't Make This Change?</p>
            <p class="security-text">
              If you did not request this password change, please secure your account immediately by contacting our support team. Do not share this email with anyone.
            </p>
          </div>

          <p class="action-text">
            Your account is now protected with your new password. For your security, never share your password with anyone, and always use a strong, unique password.
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p class="footer-text">
            © ${new Date().getFullYear()} Chatly. All rights reserved.
          </p>
          <p class="footer-text">
            This is an automated security notification. Please do not reply to this email.
          </p>
        </div>

      </div>
    </div>
  </body>
  </html>
  `;
};
