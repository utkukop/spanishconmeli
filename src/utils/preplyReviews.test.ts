import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parsePreplyHtmlReviews,
  enrichReviewsWithStudentProfiles,
} from './preplyReviews.ts';

test('parsePreplyHtmlReviews parses __NEXT_DATA__ reviews and ignores avatar placeholders', () => {
  const sampleHtml = `
    <html>
      <body>
        <script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
          props: {
            pageProps: {
              reviewDistribution: {
                nr1Stars: 0,
                nr2Stars: 0,
                nr3Stars: 0,
                nr4Stars: 0,
                nr5Stars: 2,
              },
              reviews: [
                {
                  id: 101,
                  score: 5,
                  content: 'Melissa is wonderful!',
                  created: '2025-01-01T00:00:00Z',
                  reviewerInfo: { lessonCount: 42 },
                  user: {
                    firstName: 'Sofia',
                    profile: {
                      avatarUrlHttps: 'https://avatars.preply.com/i/logos/sample.jpg',
                    },
                  },
                },
                {
                  id: 102,
                  score: 5,
                  content: 'Learned so fast!',
                  created: '2024-12-01T00:00:00Z',
                  reviewerInfo: { lessonCount: 10 },
                  user: {
                    firstName: '',
                    profile: {
                      avatarUrlHttps: 'https://static.preply.com/images/avatar-placeholder.png',
                    },
                  },
                },
              ],
            },
          },
        })}</script>
      </body>
    </html>
  `;

  const result = parsePreplyHtmlReviews(sampleHtml);
  assert.equal(result.totalReviews, 2);
  assert.equal(result.averageRating, 5);
  assert.equal(result.reviews.length, 2);
  assert.equal(result.reviews[0].firstName, 'Sofia');
  assert.equal(result.reviews[0].avatar, 'https://avatars.preply.com/i/logos/sample.jpg');
  assert.equal(result.reviews[0].lessonCount, 42);
  assert.equal(result.reviews[1].firstName, 'Verified Student');
  assert.equal(result.reviews[1].avatar, null);
});

test('parsePreplyHtmlReviews falls back cleanly to JSON-LD schema.org reviews', () => {
  const ldHtml = `
    <html>
      <body>
        <script type="application/ld+json">${JSON.stringify({
          '@type': 'Product',
          review: [
            {
              author: { name: 'Carlos' },
              datePublished: '2024-05-01',
              reviewBody: 'Great teacher!',
              reviewRating: { ratingValue: '5.00' },
            },
            {
              author: { name: 'Anonymous' },
              datePublished: '2024-04-01',
              reviewBody: 'Very patient.',
              reviewRating: { ratingValue: '5.00' },
            },
          ],
        })}</script>
      </body>
    </html>
  `;

  const result = parsePreplyHtmlReviews(ldHtml);
  assert.equal(result.reviews.length, 2);
  assert.equal(result.reviews[0].firstName, 'Carlos');
  assert.equal(result.reviews[1].firstName, 'Verified Student');
});

test('parsePreplyHtmlReviews deduplicates reviews with identical id or quote text', () => {
  const dupHtml = `
    <html>
      <body>
        <script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
          props: {
            pageProps: {
              reviews: [
                { id: 1, score: 5, content: 'Great lessons with Meli!', user: { firstName: 'Carlos' } },
                { id: 1, score: 5, content: 'Great lessons with Meli!', user: { firstName: 'Carlos' } },
                { id: 2, score: 5, content: 'Great   lessons   with Meli!', user: { firstName: 'Carlos' } },
                { id: 3, score: 5, content: 'Super helpful!', user: { firstName: 'Tanya' } },
              ],
            },
          },
        })}</script>
      </body>
    </html>
  `;

  const result = parsePreplyHtmlReviews(dupHtml);
  assert.equal(result.reviews.length, 2);
  assert.equal(result.reviews[0].firstName, 'Carlos');
  assert.equal(result.reviews[1].firstName, 'Tanya');
});

test('enrichReviewsWithStudentProfiles adds real student names, countries, local avatars, and Ceren', () => {
  const enriched = enrichReviewsWithStudentProfiles([
    {
      id: '640906',
      firstName: 'Verified Student',
      quote: 'Melissa is an excellent tutor! She is very dedicated to the learning experience by having slideshows.',
      rating: 5,
      avatar: null,
      createdAt: '',
      lessonCount: 21,
    },
    {
      id: '1383945',
      firstName: 'Mariagiulia',
      quote: "Melissa is a really kind person. She's prepared for what she's teaching.",
      rating: 5,
      avatar: 'https://example.com/old.jpg',
      createdAt: '',
      lessonCount: 71,
    },
  ]);

  assert.equal(enriched.length, 3);
  assert.equal(enriched[0].firstName, 'Natasha');
  assert.equal(enriched[0].country, 'USA');
  assert.equal(enriched[0].avatar, '/assets/avatars/natasha.jpg');
  assert.equal(enriched[1].country, 'Italy');
  assert.equal(enriched[1].avatar, '/assets/avatars/mariagiulia.jpg');
  assert.equal(enriched[2].firstName, 'Ceren');
  assert.equal(enriched[2].country, 'Türkiye');
  assert.equal(enriched[2].avatar, '/assets/avatars/ceren.jpg');
});
