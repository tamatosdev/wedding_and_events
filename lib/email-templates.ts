export function generateInquiryEmailTemplate(inquiry: {
  name: string
  email: string
  message: string
  vendorName: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - ${inquiry.vendorName}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #dc2626;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #dc2626;
      margin-bottom: 10px;
    }
    .title {
      font-size: 20px;
      color: #1f2937;
      margin-bottom: 5px;
    }
    .subtitle {
      color: #6b7280;
      font-size: 14px;
    }
    .content {
      margin-bottom: 30px;
    }
    .field {
      margin-bottom: 15px;
    }
    .field-label {
      font-weight: bold;
      color: #374151;
      margin-bottom: 5px;
    }
    .field-value {
      background-color: #f3f4f6;
      padding: 10px;
      border-radius: 5px;
      border-left: 4px solid #dc2626;
    }
    .message-box {
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 12px;
    }
    .cta-button {
      display: inline-block;
      background-color: #dc2626;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💒 Wedding & Events Portal</div>
      <div class="title">New Customer Inquiry</div>
      <div class="subtitle">You have received a new inquiry for ${inquiry.vendorName}</div>
    </div>

    <div class="content">
      <div class="field">
        <div class="field-label">Customer Name:</div>
        <div class="field-value">${inquiry.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email Address:</div>
        <div class="field-value">${inquiry.email}</div>
      </div>

      <div class="field">
        <div class="field-label">Vendor:</div>
        <div class="field-value">${inquiry.vendorName}</div>
      </div>

      <div class="field">
        <div class="field-label">Inquiry Message:</div>
        <div class="message-box">
          ${inquiry.message.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>

    <div style="text-align: center;">
      <a href="mailto:${inquiry.email}" class="cta-button">
        Reply to Customer
      </a>
    </div>

    <div class="footer">
      <p>This inquiry was sent through Wedding & Events Portal</p>
      <p>Please respond to the customer within 24 hours for best results</p>
    </div>
  </div>
</body>
</html>
  `
}

export function generateAdminInquiryEmailTemplate(inquiry: {
  name: string
  email: string
  message: string
  vendorName: string
  vendorEmail: string
  vendorPhone?: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>New Customer Inquiry - Admin Notification</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #dc2626;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 10px;
        }
        .title {
            font-size: 20px;
            color: #1f2937;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #6b7280;
            font-size: 14px;
        }
        .content {
            margin-bottom: 30px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: bold;
            color: #374151;
            margin-bottom: 5px;
        }
        .field-value {
            background-color: #f3f4f6;
            padding: 10px;
            border-radius: 5px;
            border-left: 4px solid #dc2626;
        }
        .message-box {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        .vendor-info {
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
        }
        .cta-button {
            display: inline-block;
            background-color: #dc2626;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 10px 5px;
        }
        .admin-actions {
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💒 Wedding & Events Portal</div>
            <div class="title">New Customer Inquiry - Admin Notification</div>
            <div class="subtitle">A customer has submitted an inquiry that requires your attention</div>
        </div>

        <div class="content">
            <div class="field">
                <div class="field-label">Customer Name:</div>
                <div class="field-value">${inquiry.name}</div>
            </div>

            <div class="field">
                <div class="field-label">Customer Email:</div>
                <div class="field-value">${inquiry.email}</div>
            </div>

            <div class="field">
                <div class="field-label">Inquiry Message:</div>
                <div class="message-box">
                    ${inquiry.message.replace(/\n/g, '<br>')}
                </div>
            </div>

            <div class="vendor-info">
                <div class="field-label">Requested Vendor:</div>
                <div class="field-value">
                    <strong>${inquiry.vendorName}</strong><br>
                    Email: ${inquiry.vendorEmail}<br>
                    ${inquiry.vendorPhone ? `Phone: ${inquiry.vendorPhone}<br>` : ''}
                </div>
            </div>
        </div>

        <div class="admin-actions">
            <a href="mailto:${inquiry.email}" class="cta-button">
                Reply to Customer
            </a>
            <a href="mailto:${inquiry.vendorEmail}" class="cta-button" style="background-color: #059669;">
                Contact Vendor
            </a>
        </div>

        <div class="footer">
            <p><strong>Admin Action Required:</strong></p>
            <p>1. Review the inquiry details above</p>
            <p>2. Contact the vendor to inform them about the inquiry</p>
            <p>3. Coordinate between customer and vendor as needed</p>
            <p>4. Follow up to ensure customer satisfaction</p>
            <br>
            <p>This inquiry was sent through Wedding & Events Portal</p>
            <p>Please respond within 24 hours for best results</p>
        </div>
    </div>
</body>
</html>
  `
}

export function generateWelcomeEmailTemplate(user: {
  name: string
  email: string
  role: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Wedding & Events Portal</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .container {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #dc2626;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #dc2626;
      margin-bottom: 10px;
    }
    .welcome-title {
      font-size: 24px;
      color: #1f2937;
      margin-bottom: 10px;
    }
    .content {
      margin-bottom: 30px;
    }
    .highlight {
      background-color: #fef2f2;
      border-left: 4px solid #dc2626;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .cta-button {
      display: inline-block;
      background-color: #dc2626;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💒 Wedding & Events Portal</div>
      <div class="welcome-title">Welcome ${user.name}!</div>
    </div>

    <div class="content">
      <p>Thank you for joining Pakistan's most trusted wedding planning platform!</p>
      
      <div class="highlight">
        <strong>Your Account Type:</strong> ${user.role === 'VENDOR' ? 'Vendor Account' : 'Admin Account'}<br>
        <strong>Email:</strong> ${user.email}
      </div>

      ${user.role === 'VENDOR' ? `
      <h3>🎉 What you can do as a Vendor:</h3>
      <ul>
        <li>Create and manage your vendor listings</li>
        <li>Upload beautiful images of your services</li>
        <li>Receive customer inquiries directly</li>
        <li>Track your listing performance</li>
        <li>Update your pricing and availability</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="http://localhost:3000/vendor/dashboard" class="cta-button">
          Go to Vendor Dashboard
        </a>
      </div>
      ` : `
      <h3>🔧 What you can do as an Admin:</h3>
      <ul>
        <li>Approve and manage vendor listings</li>
        <li>View platform analytics and statistics</li>
        <li>Manage customer inquiries</li>
        <li>Control homepage content and sections</li>
        <li>Configure SEO settings</li>
      </ul>
      
      <div style="text-align: center;">
        <a href="http://localhost:3000/admin" class="cta-button">
          Go to Admin Dashboard
        </a>
      </div>
      `}
    </div>

    <div class="footer">
      <p>Need help? Contact our support team</p>
      <p>© 2025 Wedding & Events Portal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}
