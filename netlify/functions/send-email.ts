function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
      type,
      name,
      email,
      message,
      subject,
      courseTitle,
      courseTier,
      price,
      currency = '$',
      level,
      timezone,
      bestTimes,
      torontoTime,
      submittedAtToronto,
    } = payload;

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';

    if (!cleanName || !cleanEmail || !cleanEmail.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please fill in all fields with a valid email address.' }),
      };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const adminEmail =
      process.env.TEACHER_EMAIL ||
      process.env.ADMIN_EMAIL ||
      process.env.EMAIL ||
      'spanishconmeli@gmail.com';
    const senderFrom = process.env.SENDER_EMAIL || 'spanishconmeli <hola@spanishconmeli.com>';

    const isGroupWaitlist = type === 'group_waitlist';
    const isCourseEnrollment = Boolean(courseTitle) && !isGroupWaitlist;

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);

    // 1. AUTOMATIC CONFIRMATION EMAIL TO STUDENT
    let userSubject = 'Thank you for contacting spanishconmeli!';
    let userHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #22334A; max-width: 600px; margin: 0 auto; background: #FFF6EC; padding: 28px; border-radius: 16px; border: 1px solid #E9DCCB;">
        <h2 style="color: #C8553D; margin-top: 0;">¡Hola ${safeName}!</h2>
        <p>Thank you for reaching out! We have received your message and Meli will get back to you soon.</p>
        <p style="margin-top: 24px;">¡Hablemos pronto!<br><strong>Melissa · spanishconmeli</strong></p>
      </div>
    `;

    // 2. NOTIFICATION EMAIL TO MELI
    let adminSubject = `New Contact Form Message from ${cleanName}`;
    let adminHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #22334A; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h3 style="color: #C8553D; margin-top: 0;">New Contact Form Submission</h3>
        <p><strong>Full Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(String(subject))}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background: #FFF6EC; padding: 15px; border-radius: 8px; border: 1px solid #E9DCCB; white-space: pre-wrap;">
          ${escapeHtml(String(message || 'No additional message provided.'))}
        </div>
      </div>
    `;

    const cleanLevel = typeof level === 'string' ? level.trim() : '';
    const cleanTimezone = typeof timezone === 'string' ? timezone.trim() : '';
    const cleanBestTimes = Array.isArray(bestTimes)
      ? bestTimes.map((t) => String(t).trim()).filter(Boolean)
      : [];
    const bestTimesDisplay = cleanBestTimes.join(', ') || 'Not specified';
    const cleanTorontoTime = typeof torontoTime === 'string' ? torontoTime.trim() : bestTimesDisplay;
    const cleanSubmittedToronto =
      typeof submittedAtToronto === 'string' && submittedAtToronto.trim()
        ? submittedAtToronto.trim()
        : new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }) + ' (Toronto)';

    if (isGroupWaitlist) {
      userSubject = `You're on the Group Lessons waitlist! — spanishconmeli`;
      userHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #22334A; max-width: 600px; margin: 0 auto; background: #FFF6EC; padding: 28px; border-radius: 16px; border: 1px solid #E9DCCB;">
          <h2 style="color: #C8553D; margin-top: 0;">¡Hola ${safeName}! You're on the list!</h2>
          <p>Thank you for joining the <strong>Group Lessons</strong> waitlist. I'll email you as soon as the first small groups open!</p>

          <div style="background: #ffffff; border: 1px solid #E9DCCB; border-left: 4px solid #F2B134; padding: 16px 18px; margin: 20px 0; border-radius: 10px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #22334A;">Your Waitlist Answers:</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Spanish Level:</strong> ${escapeHtml(cleanLevel || "I'm not sure")}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Your Time Zone:</strong> ${escapeHtml(cleanTimezone || 'Not specified')}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Best Times for You:</strong> ${escapeHtml(bestTimesDisplay)}</p>
          </div>

          <p style="font-size: 14px; color: #22334A;">In the meantime, feel free to reply to this email if you have any questions.</p>
          <p style="margin-top: 24px; font-size: 13px; color: #57514A;">
            ¡Hasta pronto!<br>
            <strong>Melissa · spanishconmeli</strong><br>
            <a href="https://instagram.com/spanishconmeli" style="color: #C8553D; text-decoration: none;">@spanishconmeli</a>
          </p>
        </div>
      `;

      adminSubject = `Group Lessons Waitlist: ${cleanName} (${cleanLevel || 'Level TBD'})`;
      adminHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #22334A; max-width: 640px; margin: 0 auto; padding: 20px; background: #ffffff; border: 1px solid #E9DCCB; border-radius: 12px;">
          <h3 style="color: #C8553D; margin-top: 0;">New Group Lessons Waitlist Signup</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold; width: 210px;">Name</td>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold;">Email</td>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold;">Level</td>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB;">${escapeHtml(cleanLevel || "I'm not sure")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold;">Student Time Zone</td>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB;">${escapeHtml(cleanTimezone || 'Not specified')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold;">Best Times (Student)</td>
              <td style="padding: 8px 10px; border-bottom: 1px solid #E9DCCB;">${escapeHtml(bestTimesDisplay)}</td>
            </tr>
            <tr style="background: #FFF6EC;">
              <td style="padding: 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold; color: #C8553D;">Corresponding Time (Toronto)</td>
              <td style="padding: 10px; border-bottom: 1px solid #E9DCCB; font-weight: bold; color: #22334A;">${escapeHtml(cleanTorontoTime)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 10px; font-weight: bold;">Submitted (Toronto)</td>
              <td style="padding: 8px 10px; color: #57514A;">${escapeHtml(cleanSubmittedToronto)}</td>
            </tr>
          </table>
        </div>
      `;
    } else if (isCourseEnrollment) {
      userSubject = `Welcome to the Course! - ${courseTitle}`;
      userHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #22334A; max-width: 600px; margin: 0 auto; background: #FFF6EC; padding: 28px; border-radius: 16px; border: 1px solid #E9DCCB;">
          <h2 style="color: #C8553D; margin-top: 0;">¡Hola ${safeName}! Welcome!</h2>
          <p>Thank you for inquiring about <strong>${escapeHtml(String(courseTitle))}</strong>${courseTier ? ` (${escapeHtml(String(courseTier))})` : ''}.</p>
          <p>Teacher Meli will be in touch shortly with next steps.</p>
          <p style="margin-top: 24px; font-size: 13px; color: #57514A;">
            Best regards,<br>
            <strong>spanishconmeli</strong>
          </p>
        </div>
      `;

      adminSubject = `New Course Inquiry: ${cleanName} (${courseTitle})`;
      adminHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #22334A; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h3 style="color: #C8553D; margin-top: 0;">New Course Inquiry</h3>
          <p><strong>Full Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Program:</strong> ${escapeHtml(String(courseTitle))}</p>
          ${courseTier ? `<p><strong>Package:</strong> ${escapeHtml(String(courseTier))}</p>` : ''}
          ${price ? `<p><strong>Price:</strong> ${escapeHtml(String(currency))}${escapeHtml(String(price))} USD</p>` : ''}
        </div>
      `;
    }

    const sideTasks: Promise<unknown>[] = [];

    // Optional Google Sheet Webhook (Apps Script / Zapier / Make) with Toronto column
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    let sheetLogged = false;
    if (sheetWebhook) {
      sideTasks.push(
        fetch(sheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestampToronto: cleanSubmittedToronto,
            formType: isGroupWaitlist
              ? 'Group Lessons Waitlist'
              : isCourseEnrollment
                ? 'Course Inquiry'
                : 'Contact Form',
            name: cleanName,
            email: cleanEmail,
            level: isGroupWaitlist ? cleanLevel || "I'm not sure" : '',
            timezone: cleanTimezone,
            bestTimesLocal: isGroupWaitlist ? bestTimesDisplay : '',
            correspondingTimeToronto: isGroupWaitlist ? cleanTorontoTime : '',
            message: message ? String(message).trim() : '',
          }),
        })
          .then((r) => {
            sheetLogged = r.ok;
          })
          .catch((err) => console.error('Google Sheet webhook error:', err))
      );
    }

    // Optional MailerLite integration
    const mailerLiteKey = process.env.MAILERLITE_API_KEY;
    if (mailerLiteKey && isGroupWaitlist) {
      const mlBody: Record<string, unknown> = {
        email: cleanEmail,
        fields: {
          name: cleanName,
          spanish_level: cleanLevel,
          timezone: cleanTimezone,
          best_times: bestTimesDisplay,
          toronto_time: cleanTorontoTime,
        },
      };
      if (process.env.MAILERLITE_GROUP_ID) {
        mlBody.groups = [process.env.MAILERLITE_GROUP_ID];
      }
      sideTasks.push(
        fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mailerLiteKey}`,
          },
          body: JSON.stringify(mlBody),
        }).catch((err) => console.error('MailerLite sync error:', err))
      );
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
          to: [cleanEmail],
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
          reply_to: cleanEmail,
          subject: adminSubject,
          html: adminHtml,
        }),
      });

      const [userRes, adminRes] = await Promise.all([userMail, adminMail, ...sideTasks]);

      if (!userRes.ok || !adminRes.ok) {
        const userErr = !userRes.ok ? await userRes.text() : '';
        const adminErr = !adminRes.ok ? await adminRes.text() : '';
        console.error('Resend API error:', { userErr, adminErr });
        throw new Error('Resend API error');
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, emailSent: true, sheetLogged }),
      };
    } else {
      await Promise.all(sideTasks);
      console.log('[send-email] Recorded dispatch (RESEND_API_KEY not set):', {
        type: isGroupWaitlist ? 'group_waitlist' : 'contact',
        to: cleanEmail,
        adminTo: adminEmail,
        name: cleanName,
        level: cleanLevel,
        timezone: cleanTimezone,
        bestTimes: bestTimesDisplay,
        torontoTime: cleanTorontoTime,
        sheetLogged,
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, simulated: true, emailSent: false, sheetLogged }),
      };
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to send email. Please try again later.';
    console.error('send-email handler error:', message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: message }),
    };
  }
}
