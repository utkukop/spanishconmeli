export async function handler(event: { httpMethod: string; body: string | null }) {
  // CORS Headers
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
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' }),
    };
  }

  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    const { name, email, courseTitle, courseTier, price, currency = '$' } = payload;

    if (!email || !name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: name and email.' }),
      };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const singleEmail = process.env.EMAIL || process.env.CONTACT_EMAIL;
    const teacherEmail = process.env.TEACHER_EMAIL || singleEmail || process.env.ADMIN_EMAIL;
    const senderEmail =
      process.env.SENDER_EMAIL ||
      (singleEmail ? `Spanish with Meli <${singleEmail}>` : 'Spanish with Meli <onboarding@resend.dev>');

    // Student Welcome Email HTML Template
    const studentHtml = `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF9F5; padding: 32px; border-radius: 16px; border: 1px solid #EAE5D9; color: #1E1B18;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #1E1B18; font-size: 24px; margin: 0;">Spanish with Meli<span style="color: #C73E29;">.</span></h1>
          <p style="color: #78716C; font-size: 13px; margin-top: 4px;">Real Conversational Spanish</p>
        </div>

        <div style="background: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #EAE5D9;">
          <h2 style="color: #C73E29; font-size: 18px; margin-top: 0;">¡Hola ${name}! Welcome to the Course!</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #443E38;">
            Thank you for enrolling in <strong>${courseTitle}</strong>${courseTier ? ` (${courseTier})` : ''}. Your registration has been received successfully!
          </p>
          
          <div style="background: #FAF9F5; border-left: 4px solid #C73E29; padding: 12px 16px; margin: 18px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; font-weight: bold; color: #1E1B18;">Your Enrollment Details:</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #57514A;">Program: ${courseTitle}</p>
            ${courseTier ? `<p style="margin: 2px 0 0 0; font-size: 13px; color: #57514A;">Package: ${courseTier}</p>` : ''}
            ${price ? `<p style="margin: 2px 0 0 0; font-size: 13px; color: #57514A;">Investment: ${currency}${price}</p>` : ''}
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #443E38;">
            Teacher Meli will be in touch with your direct Google Meet link, syllabus materials, and preparatory steps so you can hit the ground running.
          </p>

          <p style="font-size: 14px; line-height: 1.6; color: #443E38; margin-bottom: 0;">
            Get ready to start speaking real Spanish! If you have any immediate questions, reply directly to this email.
          </p>
        </div>

        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #A8A196;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Spanish with Meli. Madrid, Spain.</p>
          <p style="margin: 4px 0 0 0;">Follow on Instagram <a href="https://instagram.com/spanishconmeli" style="color: #C73E29; text-decoration: none;">@spanishconmeli</a></p>
        </div>
      </div>
    `;

    if (resendApiKey) {
      // Send real email via Resend REST API
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [email],
          subject: `Welcome to ${courseTitle}! - Spanish with Meli`,
          html: studentHtml,
        }),
      });

      const resendData = await resendResponse.json();

      // If teacher notification email is set up, also send notification to teacher
      if (teacherEmail && resendResponse.ok) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [teacherEmail],
            subject: `🎉 New Student Enrollment: ${name} (${courseTitle})`,
            html: `
              <p>You have a new student enrollment!</p>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Course:</strong> ${courseTitle}</li>
                <li><strong>Tier:</strong> ${courseTier || 'Standard'}</li>
                <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            `,
          }),
        }).catch((err) => console.warn('Teacher notification error:', err));
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: resendData }),
      };
    } else {
      // Free fallback mode: logs cleanly when RESEND_API_KEY is not yet added to Netlify env
      console.log('RESEND_API_KEY not configured. Simulated email sent to:', email, payload);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          simulated: true,
          message: 'Welcome email recorded (configure RESEND_API_KEY in Netlify to deliver real emails)',
        }),
      };
    }
  } catch (error: any) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error?.message || 'Internal server error sending email.' }),
    };
  }
}
