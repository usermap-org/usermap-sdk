import { useSubmitFeedback as useCoreSubmitFeedback, type SubmitFeedbackOptions } from '@usermap/sdk-core';

export type { FeedbackData, SubmitFeedbackOptions } from '@usermap/sdk-core';

export const useSubmitFeedback = (options: Omit<SubmitFeedbackOptions, 'apiUrl'> & { apiUrl?: string }) => {
  return useCoreSubmitFeedback({
    ...options,
    apiUrl: options.apiUrl ?? import.meta.env.VITE_API_URL,
  });
};
