const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, text } = req.body;

  if (!email || !text) {
    return res.status(400).json({ message: 'Email and text are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"InternGuide" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Message from InternGuide App',
      text,
      html: `<p>${text}</p>`
    });

    return res.status(200).json({ message: 'Email sent', messageId: info.messageId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};
