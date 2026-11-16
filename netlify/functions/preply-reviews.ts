import { fetchLivePreplyReviews, PREPLY_TUTOR_ID } from '../../src/utils/preplyReviews.ts';

export async function handler(event: {
  httpMethod: string;
  queryStringParameters?: Record<string, string | undefined>;
}) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=3600',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const tutorId = event.queryStringParameters?.tutorId || PREPLY_TUTOR_ID;
    const data = await fetchLivePreplyReviews(tutorId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch Preply reviews';
    console.error('[preply-reviews function] Error:', message);
    return {
      statusCode: 502,
      headers: {
        ...headers,
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ error: message }),
    };
  }
}
