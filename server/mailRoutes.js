import express from 'express';
import nodemailer from 'nodemailer';
import conf from './config/conf.js';
import logger from './logFile/logger.js';


const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: conf.profileproEMAIL_USER,
    pass: conf.profileproEMAIL_PASSWORD,
  },
});

//  console.log(conf.profileproEMAIL_PASSWORD,conf.profileproEMAIL_USER,conf.profileproPersonalMail);
 

router.post('/send-email', async (req, res) => {
  const { name, email, tel } = req.body;

  const mailOptions = {
    from: conf.profileproEMAIL_USER,
    to: conf.profileproPersonalMail,
    subject: 'New Contact Request from ProfilePro',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Contact Request</h2>
        <p>Someone visited ProfilePro and would like to get in touch with you. Here are the details:</p>
        <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Email</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Telephone</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${tel}</td>
          </tr>
        </table>
        <p>Visit <a href="http://localhost:5173/" style="color: #0066cc;">ProfilePro website</a> for more details.</p>
        <p>Best regards,<br>ProfilePro Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully');
    res.json({ Status: 'Success', Message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    logger.error('Error sending email:', error.message);
    res.status(500).json({ Error: 'Error sending email', Details: error.message });
  }
});

export default router;
