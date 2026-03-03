import { useState } from 'react';

interface FeedbackData {
  sentiment: 'positive' | 'negative';
  message?: string;
  userEmail?: string;
}

interface UseSubmitFeedbackOptions {
  token: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSubmitFeedback = ({ token, onSuccess, onError }: UseSubmitFeedbackOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitFeedback = async (data: FeedbackData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit feedback: ${response.statusText}`);
      }

      const result = await response.json();
      onSuccess?.();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitFeedback,
    isLoading,
    error,
  };
};
