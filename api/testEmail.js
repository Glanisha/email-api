const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'Testing email service from Vercel serverless function.'
    });

    res.status(200).json({ message: 'Test email sent', messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send test email', error: error.message });
  }
};
