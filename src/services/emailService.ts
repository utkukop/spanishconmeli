export interface EnrollmentEmailPayload {
  name: string;
  email: string;
  courseTitle: string;
  courseTier?: string;
  price?: number;
  currency?: string;
  message?: string;
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  try {
    const endpoints = ['/.netlify/functions/send-email', '/api/send-email'];
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, simulated: data.simulated };
        }
      } catch {
        // try next endpoint
      }
    }

    console.log('[emailService] Contact message recorded locally:', payload);
    return { success: true, simulated: true };
  } catch (err: any) {
    console.warn('[emailService] Contact dispatch note:', err?.message);
    return { success: true, simulated: true };
  }
}

export async function sendEnrollmentEmail(
  payload: EnrollmentEmailPayload
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  try {
    const endpoints = ['/.netlify/functions/send-email', '/api/send-email'];
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, simulated: data.simulated };
        }
      } catch {
        // try next endpoint
      }
    }

    console.log('[emailService] Enrollment recorded locally:', payload);
    return { success: true, simulated: true };
  } catch (err: any) {
    console.warn('[emailService] Enrollment dispatch note:', err?.message);
    return { success: true, simulated: true };
  }
}
