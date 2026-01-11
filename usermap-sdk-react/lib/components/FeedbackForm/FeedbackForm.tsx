import { useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import styles from './FeedbackForm.module.scss'
import { HappyIcon } from '../../icons/HappyIcon';
import { SadIcon } from '../../icons/SadIcon';
import { useSubmitFeedback } from '../../hooks/useSubmitFeedback';

export interface FeedbackFormProps {
  title?: string;
  token: string;
}

export function FeedbackForm({
  title = "How do you like the app so far?",
  token
}: FeedbackFormProps) {
  const [positiveOpen, setPositiveOpen] = useState(false);
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [positiveFeedback, setPositiveFeedback] = useState('');
  const [negativeFeedback, setNegativeFeedback] = useState('');

  const { submitFeedback, isLoading } = useSubmitFeedback({
    token,
    onSuccess: () => {
      // Close dialogs and reset feedback on success
      setPositiveOpen(false);
      setNegativeOpen(false);
      setPositiveFeedback('');
      setNegativeFeedback('');
    },
    onError: (error) => {
      console.error('Failed to submit feedback:', error);
    },
  });

  const handlePositiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFeedback({
        sentiment: 'positive',
        content: positiveFeedback,
      });
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  const handleNegativeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFeedback({
        sentiment: 'negative',
        content: negativeFeedback,
      });
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  const handlePositiveClick = async () => {
    // Submit feedback immediately when button is clicked
    try {
      await submitFeedback({
        sentiment: 'positive',
      });
    } catch (error) {
      // Error is already handled by the hook
    }
    // Open dialog so user can optionally add details
    setPositiveOpen(true);
  };

  const handleNegativeClick = async () => {
    // Submit feedback immediately when button is clicked
    try {
      await submitFeedback({
        sentiment: 'negative',
      });
    } catch (error) {
      // Error is already handled by the hook
    }
    // Open dialog so user can optionally add details
    setNegativeOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <p>{title}</p>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={handlePositiveClick}>
            <HappyIcon />
          </button>
          <button className={styles.button} onClick={handleNegativeClick}>
            <SadIcon />
          </button>
        </div>
      </div>

      {/* Positive Feedback Dialog */}
      <Dialog.Root open={positiveOpen} onOpenChange={setPositiveOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Viewport className={styles.viewport}>
            <Dialog.Popup className={styles.popup}>
              <Dialog.Title className={styles.dialogTitle}>
                What do you like?
              </Dialog.Title>
              <Dialog.Description className={styles.dialogDescription}>
                Tell us what you're enjoying about the app
              </Dialog.Description>
              <form onSubmit={handlePositiveSubmit} className={styles.form}>
                <textarea
                  value={positiveFeedback}
                  onChange={(e) => setPositiveFeedback(e.target.value)}
                  placeholder="Share your positive feedback..."
                  className={styles.textarea}
                  rows={5}
                />
                <div className={styles.dialogActions}>
                  <Dialog.Close className={styles.cancelButton}>
                    Cancel
                  </Dialog.Close>
                  <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Negative Feedback Dialog */}
      <Dialog.Root open={negativeOpen} onOpenChange={setNegativeOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Viewport className={styles.viewport}>
            <Dialog.Popup className={styles.popup}>
              <Dialog.Title className={styles.dialogTitle}>
                What don't you like?
              </Dialog.Title>
              <Dialog.Description className={styles.dialogDescription}>
                Help us improve by sharing what's not working for you
              </Dialog.Description>
              <form onSubmit={handleNegativeSubmit} className={styles.form}>
                <textarea
                  value={negativeFeedback}
                  onChange={(e) => setNegativeFeedback(e.target.value)}
                  placeholder="Share your concerns or suggestions..."
                  className={styles.textarea}
                  rows={5}
                />
                <div className={styles.dialogActions}>
                  <Dialog.Close className={styles.cancelButton}>
                    Cancel
                  </Dialog.Close>
                  <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}