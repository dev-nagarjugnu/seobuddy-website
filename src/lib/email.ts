// src/lib/email.ts

interface EmailData {
  to: string;
  userName: string;
  orderId: string;
  serviceType: string;
  status: string;
  adminNotes: string;
  action: 'accept' | 'reject' | 'update';
}

export async function sendOrderNotificationEmail({
  to,
  userName,
  orderId,
  serviceType,
  status,
  adminNotes,
  action
}: EmailData) {
  try {
    // For development, we'll log the email details
    // In production, you would integrate with a real email service
    console.log('📧 Email Notification Details:', {
      to,
      userName,
      orderId,
      serviceType,
      status,
      adminNotes,
      action,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement actual email sending
    // Example integrations:
    
    // 1. SendGrid
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: to,
      from: 'noreply@seobuddy.io',
      subject: `Your SEO Order ${action === 'accept' ? 'Accepted' : 'Rejected'} - Order #${orderId}`,
      html: generateEmailTemplate({ userName, orderId, serviceType, status, adminNotes, action })
    };
    
    await sgMail.send(msg);
    */

    // 2. AWS SES
    /*
    const AWS = require('aws-sdk');
    const ses = new AWS.SES({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    
    const params = {
      Source: 'noreply@seobuddy.io',
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: `Your SEO Order ${action === 'accept' ? 'Accepted' : 'Rejected'} - Order #${orderId}` },
        Body: { Html: { Data: generateEmailTemplate({ userName, orderId, serviceType, status, adminNotes, action }) } }
      }
    };
    
    await ses.sendEmail(params).promise();
    */

    // 3. Nodemailer (for SMTP)
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    await transporter.sendMail({
      from: 'noreply@seobuddy.io',
      to: to,
      subject: `Your SEO Order ${action === 'accept' ? 'Accepted' : 'Rejected'} - Order #${orderId}`,
      html: generateEmailTemplate({ userName, orderId, serviceType, status, adminNotes, action })
    });
    */

    return { success: true, message: 'Email logged successfully (development mode)' };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function generateEmailTemplate({ 
  userName, 
  orderId, 
  serviceType, 
  status, 
  adminNotes, 
  action 
}: EmailData) {
  const isAccepted = action === 'accept';
  const isRejected = action === 'reject';
  const isUpdated = action === 'update';
  
  const getTitle = () => {
    if (isAccepted) return 'Accepted';
    if (isRejected) return 'Rejected';
    if (isUpdated) return 'Status Updated';
    return 'Updated';
  };
  
  const getStatusClass = () => {
    if (status === 'Completed') return 'accepted';
    if (status === 'Cancelled') return 'rejected';
    return 'accepted';
  };
  
  const getNotesLabel = () => {
    if (isAccepted) return 'Acceptance Notes';
    if (isRejected) return 'Rejection Reason';
    if (isUpdated) return 'Update Notes';
    return 'Notes';
  };
  
  const getMessage = () => {
    if (isAccepted) {
      return `
        <p>We're excited to work on your SEO project! Our team will begin processing your order shortly.</p>
        <p>You'll receive updates on the progress of your order as we work on it.</p>
      `;
    }
    if (isRejected) {
      return `
        <p>If you have any questions about this decision or would like to discuss alternative options, please don't hesitate to contact us.</p>
      `;
    }
    if (isUpdated) {
      if (status === 'Completed') {
        return `
          <p>Great news! Your SEO project has been completed successfully.</p>
          <p>Please review the work and let us know if you need any adjustments or have questions.</p>
        `;
      }
      return `
        <p>Your order status has been updated. Please review the details below.</p>
        <p>If you have any questions about this update, please don't hesitate to contact us.</p>
      `;
    }
    return '';
  };
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order ${getTitle()}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
        .accepted { background: #d4edda; color: #155724; }
        .rejected { background: #f8d7da; color: #721c24; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SEO Buddy</h1>
          <h2>Order ${getTitle()}</h2>
        </div>
        
        <div class="content">
          <p>Dear ${userName},</p>
          
          <p>Your order has been <strong>${isUpdated ? 'updated' : isAccepted ? 'accepted' : 'rejected'}</strong> by our team.</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Service:</strong> ${serviceType}</p>
            <p><strong>Status:</strong> 
              <span class="status-badge ${getStatusClass()}">
                ${status}
              </span>
            </p>
          </div>
          
          <div class="order-details">
            <h3>${getNotesLabel()}:</h3>
            <p>${adminNotes}</p>
          </div>
          
          ${getMessage()}
          
          <p>Thank you for choosing SEO Buddy!</p>
          
          <p>Best regards,<br>The SEO Buddy Team</p>
        </div>
        
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>If you need assistance, please contact us through our website.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
