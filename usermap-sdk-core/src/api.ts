import { DEFAULT_API_URL, type FeedbackData } from './types';

export async function submitFeedbackRequest(
  token: string,
  data: FeedbackData,
  apiUrl: string = DEFAULT_API_URL,
): Promise<unknown> {
  console.log('Submitting feedback:', data);
  const response = await fetch(`${apiUrl}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log('Response:', response);

  if (!response.ok) {
    throw new Error(`Failed to submit feedback: ${response.statusText}`);
  }

  return response.json();
}
