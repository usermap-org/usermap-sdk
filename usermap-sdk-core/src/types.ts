export interface FeedbackData {
  sentiment: 'positive' | 'negative';
  message?: string;
  userEmail?: string;
  tags?: Record<string, string>;
}

export interface SubmitFeedbackOptions {
  token: string;
  apiUrl?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const DEFAULT_API_URL = 'https://api.usermap.app/v0';
