const welcomeEmail = (username, email, password) => {
    return `
<html lang="en">
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
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #f97316;
      padding: 30px;
      text-align: center;
      color: #fff;
    }
    .header img {
      max-width: 100px;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      letter-spacing: 1px;
    }
    .hero {
      width: 100%;
      height: 200px;
      background-image: url('https://jhapali.org/wp-content/uploads/2020/09/cropped-logo-5.png');
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
      background-color: #16a34a;
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
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
      <img src="https://jhapali.org/wp-content/uploads/2020/09/cropped-logo-5.png" alt="Jhapali Samaj Logo">
      <h1>Welcome to Jhapali Samaj</h1>
    </div>
    <div class="hero"></div>
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
        <a href="https://jhapalisamajusa.vercel.app/login" class="button">Login to Your Account</a>
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
      <p>For more information, visit our <a href="https://jhapalisamajusa.vercel.app/">website</a>.</p>
    </div>
  </div>
</body>
</html>
`;
};

module.exports = {
    welcomeEmail,
};
