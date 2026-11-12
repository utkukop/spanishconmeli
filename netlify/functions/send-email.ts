export async function handler(event: { httpMethod: string; body: string | null }) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    const {
      name,
      email,
      message,
      subject,
      courseTitle,
      courseTier,
      price,
      currency = '$',
    } = payload;

    if (!name || !email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please fill in all fields with a valid email address.' }),
      };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const adminEmail = process.env.TEACHER_EMAIL || process.env.ADMIN_EMAIL || 'spanishconmeli@gmail.com';
    const senderFrom = process.env.SENDER_EMAIL || 'Spanish con Meli <hola@spanishconmeli.com>';

    const isCourseEnrollment = Boolean(courseTitle);

    // 1. AUTOMATIC WELCOME / CONFIRMATION EMAIL TO THE USER
    let userSubject = 'Thank you for contacting Spanish con Meli!';
    let userHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #EAE5D9;">
        <h2 style="color: #C73E29; margin-top: 0;">Hola ${name},</h2>
        <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br><strong>Spanish con Meli</strong></p>
      </div>
    `;

    if (isCourseEnrollment) {
      userSubject = `Welcome to the Course! - ${courseTitle}`;
      userHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #EAE5D9;">
          <h2 style="color: #C73E29; margin-top: 0;">¡Hola ${name}! Welcome to the Course!</h2>
          <p>Thank you for registering for <strong>${courseTitle}</strong>${courseTier ? ` (${courseTier})` : ''}. Your access details and welcome guide have been registered!</p>
          
          <div style="background: #FAF9F5; border-left: 4px solid #C73E29; padding: 14px 18px; margin: 20px 0; border-radius: 6px;">
            <p style="margin: 0; font-weight: bold; color: #1E1B18;">Your Enrollment Details:</p>
            <p style="margin: 4px 0 0 0; color: #57514A;">Program: ${courseTitle}</p>
            ${courseTier ? `<p style="margin: 2px 0 0 0; color: #57514A;">Package: ${courseTier}</p>` : ''}
            ${price ? `<p style="margin: 2px 0 0 0; color: #57514A;">Investment: ${currency}${price} USD</p>` : ''}
          </div>

          <p>Teacher Meli will be in touch shortly with your Google Meet access link, syllabus materials, and preparatory steps.</p>
          <p>Get ready to start speaking real Spanish!</p>
          <p style="margin-top: 24px; font-size: 13px; color: #78716C;">
            Best regards,<br>
            <strong>Spanish con Meli</strong><br>
            Follow on Instagram: <a href="https://instagram.com/spanishconmeli" style="color: #C73E29; text-decoration: none;">@spanishconmeli</a>
          </p>
        </div>
      `;
    }

    // 2. NOTIFICATION EMAIL TO YOU (GMAIL)
    let adminSubject = `New Contact Form Message from ${name}`;
    let adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h3 style="color: #1E1B18; margin-top: 0;">New Contact Form Submission</h3>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
          ${message || 'No additional message provided.'}
        </div>
      </div>
    `;

    if (isCourseEnrollment) {
      adminSubject = `🎉 New Course Enrollment: ${name} (${courseTitle})`;
      adminHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h3 style="color: #C73E29; margin-top: 0;">🎉 New Student Enrollment!</h3>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Program:</strong> ${courseTitle}</p>
          <p><strong>Package / Tier:</strong> ${courseTier || 'Standard'}</p>
          ${price ? `<p><strong>Price:</strong> ${currency}${price} USD</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `;
    }

    if (RESEND_API_KEY) {
      const userMail = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: senderFrom,
          to: [email],
          reply_to: 'spanishconmeli@gmail.com',
          subject: userSubject,
          html: userHtml,
        }),
      });

      const adminMail = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: senderFrom,
          to: [adminEmail],
          reply_to: email,
          subject: adminSubject,
          html: adminHtml,
        }),
      });

      const [userRes, adminRes] = await Promise.all([userMail, adminMail]);

      if (!userRes.ok || !adminRes.ok) {
        const userErr = !userRes.ok ? await userRes.text() : '';
        const adminErr = !adminRes.ok ? await adminRes.text() : '';
        console.error('Resend API error:', { userErr, adminErr });
        throw new Error('Resend API error');
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    } else {
      console.log('[send-email] Simulated dispatch (RESEND_API_KEY pending):', {
        to: email,
        adminTo: adminEmail,
        isCourseEnrollment,
        name,
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, simulated: true }),
      };
    }
  } catch (error: any) {
    console.error('send-email handler error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error?.message || 'Failed to send email. Please try again later.' }),
    };
  }
}
