const welcomeEmail = (username, email, password) => {
  return `
    <html lang = "en">
      <head>
        <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Jhapali Samaj</title>
            <style>
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    margin: 0;
    padding: 0;
    color: #333;
  }
  .container {
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .header {
    background-color: #f97316;
    padding: 30px;
    text-align: center;
    color: #ffffff;
    border-radius: 8px 8px 0 0;
  }
  .header img {
    max-width: 100px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  .header h1 {
    margin: 0;
    font-size: 28px;
    letter-spacing: 1px;
  }
  .content {
    padding: 30px;
    text-align: left;
    line-height: 1.6;
  }
  .content h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 15px;
  }
  .content p {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .details {
    background-color: #f4f7fc;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .details p {
    margin: 5px 0;
    font-size: 15px;
  }
  .details .label {
    font-weight: bold;
    color: #16a34a;
  }
  .button-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .button {
    background-color: #16a34a;
    color: #ffffff;
    padding: 12px 30px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  .button:hover {
    background-color: #128333;
  }
  .features {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .feature {
    width: 48%;
    background-color: #f9f9f9;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  .feature h3 {
    font-size: 18px;
    color: #f97316;
    margin-bottom: 10px;
  }
  .feature p {
    font-size: 14px;
    margin: 0;
  }
  .footer {
    background-color: #f4f7fc;
    text-align: center;
    padding: 20px;
    font-size: 14px;
    color: #777;
    border-top: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
  }
  .footer a {
    color: #f97316;
    text-decoration: none;
  }
  .footer a:hover {
    text-decoration: underline;
  }
  @media only screen and (max-width: 600px) {
    .feature {
      width: 100%;
    }
  }
</style>

          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://api.jhapali.org/uploads/logo/logo.png" alt="Jhapali Samaj Logo">
                  <h1>Welcome to Jhapali Samaj</h1>
              </div>
              <div class="content">
                <h2>Hello ${username},</h2>
                <p>We're thrilled to have you join our vibrant community of like-minded individuals. At Jhapali Samaj, you'll find a platform designed to connect, share, and grow together.</p>
                <div class="details">
                  <p><span class="label">Username:</span> ${username}</p>
                  <p><span class="label">Email:</span> ${email}</p>
                  <p><span class="label">Password:</span> ${password}</p>
                </div>
                <p>Your account has been successfully created. Get started by exploring our website and connecting with other members.</p>
                <div class="button-container">
                  <a href="https://jhapali.org/login" class="button">Login to Your Account</a>
                </div>
                <h2>Explore Our Features</h2>
                <div class="features">
                  <div class="feature">
                    <h3>Connect</h3>
                    <p>Engage with community members and build lasting relationships.</p>
                  </div>
                  <div class="feature">
                    <h3>Events</h3>
                    <p>Stay updated with our latest events and meetups.</p>
                  </div>
                  <div class="feature">
                    <h3>Resources</h3>
                    <p>Access exclusive content and tools designed for you.</p>
                  </div>
                  <div class="feature">
                    <h3>Support</h3>
                    <p>We're here to help. Contact our support team anytime.</p>
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>If you did not sign up for this account, please ignore this email or contact our support team immediately.</p>
                <p>For more information, visit our <a href="https://jhapali.org/">website</a>.</p>
              </div>
            </div>
          </body>
        </html>
        `;
};
const PasswordChangedEmail = (username, email, password) => {
  return `
        <html lang="en">
          <head>
            <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Password Has Been Changed</title>
                <style>
                  body {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
                  margin: 0;
                  padding: 0;
                  color: #333;
    }
                  .container {
                    width: 100%;
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                  overflow: hidden;
    }
                  .header {
                    background-color: #f97316;
                  padding: 30px;
                  text-align: center;
                  color: #ffffff;
                  border-radius: 8px 8px 0 0;
    }
                  .header img {
                    max-width: 120px;
                  margin-bottom: 20px;
                  border-radius: 8px;
    }
                  .header h1 {
                    margin: 0;
                  font-size: 28px;
                  letter-spacing: 1px;
    }
                  .hero {
                    width: 100%;
                  height: 200px;
                  background-image: url('https://api.jhapali.org/uploads/logo/logo.png');
                  background-size: cover;
                  background-position: center;
    }
                  .content {
                    padding: 30px;
                  text-align: left;
                  line-height: 1.6;
    }
                  .content h2 {
                    font-size: 24px;
                  color: #333;
                  margin-bottom: 15px;
    }
                  .content p {
                    font-size: 16px;
                  margin-bottom: 15px;
    }
                  .details {
                    background-color: #f4f7fc;
                  padding: 15px;
                  border-radius: 5px;
                  margin-bottom: 20px;
    }
                  .details p {
                    margin: 5px 0;
                  font-size: 15px;
    }
                  .details .label {
                    font-weight: bold;
                  color: #16a34a;
    }
                  .button-container {
                    text-align: center;
                  margin-bottom: 20px;
    }
                  .button {
                    background-color:rgb(255, 255, 255);
                  color: #ffffff;
                  padding: 12px 30px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  display: inline-block;
    }
                  .button:hover {
                    background-color:rgb(169, 169, 169);
    }
                  .features {
                    margin: 20px 0;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
    }
                  .feature {
                    width: 48%;
                  background-color: #f9f9f9;
                  padding: 15px;
                  margin-bottom: 15px;
                  border-radius: 5px;
                  text-align: center;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
                  .feature h3 {
                    font-size: 18px;
                  color: #f97316;
                  margin-bottom: 10px;
    }
                  .feature p {
                    font-size: 14px;
                  margin: 0;
    }
                  .footer {
                    background-color: #f4f7fc;
                  text-align: center;
                  padding: 20px;
                  font-size: 14px;
                  color: #777;
                  border-top: 1px solid #ddd;
                  border-radius: 0 0 8px 8px;
    }
                  .footer a {
                    color: #f97316;
                  text-decoration: none;
    }
                  .footer a:hover {
                    text-decoration: underline;
    }
                  @media only screen and (max-width: 600px) {
      .feature {
                    width: 100%;
      }
    }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <img src="https://api.jhapali.org/uploads/logo/logo.png" alt="Jhapali Samaj Logo">
                      <h1>Your Password Has Successfully Been Changed</h1>
                  </div>

                  <div class="content">
                    <h2>Hello ${username},</h2>
                    <p>If you didn't do it, please contact our admins.</p>
                    <div class="details">
                      <p><span class="label">Username:</span> ${username}</p>
                      <p><span class="label">Email:</span> ${email}</p>
                      <p><span class="label">Password:</span> ${password}</p>
                      <!-- Avoid displaying password in emails -->
                    </div>
                    <p>Your password has been successfully updated.</p>
                    <div class="button-container">
                      <a href="https://jhapali.org/login" class="button">Login to Your Account</a>
                    </div>
                  </div>

                  <div class="footer">
                    <p>If you did not change your password, contact our support team immediately.</p>
                    <p>For more information, visit our <a href="https://jhapali.org/">website</a>.</p>
                  </div>
                </div>
              </body>
            </html>

            `;
};

const attendeeRegistrationEmail = (fullName) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Registration Confirmation</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Inter', sans-serif; background-color: #f0f4f8; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="background-color: #f97316; padding: 24px; text-align: center; color: #ffffff; font-size: 22px; font-weight: 700;">
                  🌸 अन्तर्राष्ट्रिय झापाली समाज - चौथो क्षेत्रीय भेला 🌸
              </td>
          </tr>
          <tr>
              <td style="padding: 28px 24px; color: #333333; font-size: 16px; line-height: 1.7;">
                  <p style="margin-bottom: 16px;">Dear <strong>${fullName}</strong>,</p>

                  <p style="margin-bottom: 20px;">
                    Thank you for registering for the <strong>4th Regional Gathering of Antarashtriya Jhapali Samaj</strong>, hosted by <strong>Jhapali Samaj USA</strong>.
                    Your registration is currently <strong>under review</strong>. We will notify you once your seat is confirmed.
                  </p>

                  <div style="background-color: #fdf4e7; border: 1px solid #fcd9b6; padding: 18px; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin: 0;"><strong>🗓 Date:</strong> April 12, 2025</p>
                    <p style="margin: 0;"><strong>🕘 Time:</strong> 10:00 AM – 5:00 PM</p>
                    <p style="margin: 0;"><strong>📍 Venue:</strong> DoubleTree by Hilton McLean Tyson</p>
                    <p style="margin: 0;"><strong>📫 Address:</strong> 1960 Chain Bridge Rd, McLean VA, USA</p>
                  </div>

                  <p style="margin-bottom: 28px;">
                    We are truly excited to host you at this grand event, where the Jhapali community from across the globe comes together.
                  </p>

                  <p>Warm regards,<br /><strong>Jhapali Samaj USA Team</strong></p>
              </td>
          </tr>
          <tr>
              <td style="background-color: #f97316; padding: 16px; text-align: center; color: #ffffff; font-size: 13px;">
                  &copy; 2025 Jhapali Samaj USA. All rights reserved.
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
};

const attendeeDeclineEmail = (fullName, declineReason) => {
  return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Registration Status</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 2px dashed #f97316;">
        <tr>
            <td style="background-color: #f97316; padding: 20px; text-align: center; color: #ffffff; font-size: 24px; font-weight: bold;">
                Your Event Registration Status
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5; text-align: center;">
                <p>Dear ${fullName},</p>
                <p>Unfortunately, your registration for the event has been declined due to the following reason:</p>
                <p><strong>Reason for Decline:</strong> ${declineReason}</p>
                <p>We apologize for any inconvenience caused and appreciate your understanding.</p>
                <p>If you have any questions, feel free to reach out to us.</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f97316; padding: 10px; text-align: center; color: #ffffff; font-size: 14px;">
                &copy; 2025 Jhapali Samaj USA Team. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

const attendeeAcceptEmail = (fullName, attendeeId) => {
  // Google Calendar event link (example format)
  const calendarUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=Jhapali+Samaj+USA+Event&dates=20250412T140000Z/20250412T210000Z&details=Join+us+for+the+4th+Regional+Jhapali+Gathering&location=DoubleTree+by+Hilton+McLean+Tyson,+1960+Chain+Bridge+Rd,+McLean+VA,+USA";

  // Google Maps location link
  const mapsUrl = "https://www.google.com/maps?q=1960+Chain+Bridge+Rd,+McLean+VA,+USA";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your Event Pass</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Inter', sans-serif; background-color: #f0f4f8; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 2px dashed #f97316;">
          
          <!-- Header -->
          <tr>
              <td style="background-color: #f97316; padding: 24px; text-align: center; color: #ffffff; font-size: 22px; font-weight: 700;">
                  तपाईँको कार्यक्रम पास तयार छ!
              </td>
          </tr>

          <!-- QR Section -->
          <tr>
              <td style="text-align: center; padding: 10px 20px;">
                  <p style="font-size: 16px; color: #333; font-weight: 600; margin-bottom: 8px;">
                    Present this QR code at the event entrance:
                  </p>
                  <img
                      src="https://api.qrserver.com/v1/create-qr-code/?data=${attendeeId}&size=160x160"
                      alt="QR Code"
                      style="margin-top: 10px; border: 3px solid #f97316; border-radius: 8px;"
                  />
                  <p style="font-size: 13px; color: #888; margin-top: 10px;">
                    Your unique pass — please keep it confidential.
                  </p>
              </td>
          </tr>

          <!-- Main Body -->
          <tr>
              <td style="padding: 24px 20px; color: #333333; font-size: 16px; line-height: 1.6; text-align: center;">
                  <p>Dear <strong>${fullName}</strong>,</p>
                  <p>Your registration has been <strong>approved</strong> for the 4th Regional Gathering of Antarashtriya Jhapali Samaj hosted by Jhapali Samaj USA.</p>

                  <!-- Event Info -->
                  <div style="background-color: #fef3e7; border: 1px solid #fcd9b6; padding: 16px; border-radius: 10px; margin: 20px 0;">
                    <p style="margin: 4px 0;"><strong>🗓 Date:</strong> April 12, 2025</p>
                    <p style="margin: 4px 0;"><strong>🕘 Time:</strong> 10:00 AM – 5:00 PM</p>
                    <p style="margin: 4px 0;"><strong>📍 Venue:</strong> DoubleTree by Hilton McLean Tyson</p>
                    <p style="margin: 4px 0;"><strong>📫 Address:</strong> 1960 Chain Bridge Rd, McLean VA, USA</p>
                  </div>

                  <p>We can't wait to welcome you and celebrate with the global Jhapali community!</p>

                  <!-- Buttons -->
                  <div style="margin-top: 20px;">
                      <a href="${calendarUrl}" target="_blank" style="text-decoration: none; margin-right: 10px;">
                          <button style="background-color: #10b981; color: white; padding: 10px 18px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">
                              📅 Add to Calendar
                          </button>
                      </a>
                      <a href="${mapsUrl}" target="_blank" style="text-decoration: none;">
                          <button style="background-color: #3b82f6; color: white; padding: 10px 18px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">
                              📍 Get Directions
                          </button>
                      </a>
                  </div>
              </td>
          </tr>

          <!-- Footer -->
          <tr>
              <td style="background-color: #f97316; padding: 16px; text-align: center; color: #ffffff; font-size: 13px;">
                  &copy; 2025 Jhapali Samaj USA. All rights reserved.
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
};



module.exports = {
  welcomeEmail,
  PasswordChangedEmail,
  attendeeRegistrationEmail,
  attendeeAcceptEmail,
  attendeeDeclineEmail,
};
