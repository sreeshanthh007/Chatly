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
