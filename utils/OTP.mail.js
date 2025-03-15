var nodemailer = require("nodemailer");
let { mailid, mailpass } = require('../config/config');

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailid,
    pass: mailpass,
  },
});

const sendMail = async ({ receversMail, subject, userOTP, headLine, body }) => {

  return new Promise((resolve, reject) => {


    let content = body || `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 32px 20px;
            text-align: center;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1));
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 32px 24px;
            color: #374151;
        }
        .content p {
            margin: 0 0 16px;
            font-size: 16px;
        }
        .highlight {
            color: #6366f1;
            font-weight: 500;
        }
        .otp {
            font-size: 32px;
            font-weight: 700;
            color: #6366f1;
            background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
            border: 2px dashed #6366f1;
            display: inline-block;
            padding: 16px 32px;
            border-radius: 12px;
            margin: 24px 0;
            letter-spacing: 4px;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
            transition: all 0.3s ease;
        }
        .otp:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }
        .warning {
            font-size: 14px;
            color: #6b7280;
            background-color: #f9fafb;
            padding: 16px;
            border-radius: 12px;
            margin: 20px 0;
            border-left: 4px solid #6366f1;
        }
        .footer {
            background-color: #f9fafb;
            text-align: center;
            padding: 24px 20px;
            font-size: 13px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
        .footer a {
            color: #6366f1;
            text-decoration: none;
            font-weight: 500;
            margin: 0 8px;
            transition: color 0.2s ease;
        }
        .footer a:hover {
            color: #4f46e5;
            text-decoration: underline;
        }
        .divider {
            color: #d1d5db;
            margin: 0 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${headLine}</h1>
        </div>
        <div class="content">
            <p>Hi there! 👋</p>
            <p>Welcome to <span class="highlight">StudyPlanner</span>! To ensure the security of your account, we've generated a One-Time Password (OTP) for you.</p>
            <center><div class="otp">${userOTP}</div></center>
            <div class="warning">
                <p style="margin: 0;">🔒 <strong>Security Notice:</strong></p>
                <p style="margin: 8px 0 0 0;">• This OTP will expire in 10 minutes<br>
                • Never share your OTP with anyone<br>
                • Our team will never ask for your OTP</p>
            </div>
            <p>If you didn't initiate this request, please ignore this email and contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p style="margin-bottom: 12px;">© ${new Date().getFullYear()} StudyPlanner. All rights reserved.</p>
            <div>
                <a href="#">Privacy Policy</a>
                <span class="divider">•</span>
                <a href="#">Terms of Service</a>
                <span class="divider">•</span>
                <a href="#">Help Center</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

    let mailOptions = {
      from: mailid,
      to: receversMail,
      subject: subject || "OTP Varification",
      html: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(false);
      } else {
        console.log("Email sent to : " + receversMail + info.response);
        resolve(true);
      }
    });
  })

}

// sendMail({ userOTP: Math.floor(Math.random() * 900000) + 100000, headLine: "Registration OTP" });

module.exports = sendMail;

