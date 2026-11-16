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

export interface GroupWaitlistEmailPayload {
  name: string;
  email: string;
  level: string;
  timezone: string;
  bestTimes: string[];
  torontoTime: string;
  submittedAtToronto: string;
}

async function postToEmailEndpoints(
  bodyPayload: Record<string, unknown>
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  const endpoints = ['/.netlify/functions/send-email', '/api/send-email'];
  let lastError: string | undefined;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        return { success: true, simulated: Boolean(data.simulated) };
      }

      if (response.status >= 400 && response.status < 500 && response.status !== 404) {
        return {
          success: false,
          error: data.error || 'Please check your form details and try again.',
        };
      }
      lastError = data.error;
    } catch {
      // try next endpoint
    }
  }

  if (lastError) {
    return { success: false, error: lastError };
  }
  return { success: true, simulated: true };
}

export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  return postToEmailEndpoints({ ...payload });
}

export async function sendEnrollmentEmail(
  payload: EnrollmentEmailPayload
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  return postToEmailEndpoints({ ...payload });
}

export async function sendGroupWaitlistEmail(
  payload: GroupWaitlistEmailPayload
): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  return postToEmailEndpoints({
    type: 'group_waitlist',
    ...payload,
  });
}
