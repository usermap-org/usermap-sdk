import { useState } from 'react';
import { submitFeedbackRequest } from './api';
import { DEFAULT_API_URL, type FeedbackData, type SubmitFeedbackOptions } from './types';

export const useSubmitFeedback = ({ token, apiUrl = DEFAULT_API_URL, onSuccess, onError }: SubmitFeedbackOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitFeedback = async (data: FeedbackData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitFeedbackRequest(token, data, apiUrl);
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
