import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useSubmitFeedback, DEFAULT_API_URL } from '@usermap/sdk-core';
import { HappyIcon } from '../icons/HappyIcon';
import { SadIcon } from '../icons/SadIcon';

export interface FeedbackFormProps {
  /** Your Usermap product token. */
  token: string;
  /** Custom API URL. Defaults to https://api.usermap.app/v0. */
  apiUrl?: string;
  /** The prompt displayed next to the emoji buttons. */
  title?: string;
  /** Optional key-value tags to attach to every feedback submission. */
  tags?: Record<string, string>;
  /** Called after feedback is successfully submitted. */
  onSuccess?: () => void;
  /** Called when an error occurs during submission. */
  onError?: (error: Error) => void;
}

export function FeedbackForm({
  token,
  apiUrl = DEFAULT_API_URL,
  title = 'How do you like the app so far?',
  tags,
  onSuccess,
  onError,
}: FeedbackFormProps) {
  const [positiveOpen, setPositiveOpen] = useState(false);
  const [negativeOpen, setNegativeOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const { submitFeedback, isLoading } = useSubmitFeedback({
    token,
    apiUrl,
    onSuccess: () => {
      setPositiveOpen(false);
      setNegativeOpen(false);
      setFeedbackText('');
      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Failed to submit feedback:', error);
      onError?.(error);
    },
  });

  const handlePositiveClick = async () => {
    try {
      await submitFeedback({ sentiment: 'positive', tags });
    } catch {
      // Error handled by hook
    }
    setPositiveOpen(true);
  };

  const handleNegativeClick = async () => {
    try {
      await submitFeedback({ sentiment: 'negative', tags });
    } catch {
      // Error handled by hook
    }
    setNegativeOpen(true);
  };

  const handleDialogSubmit = async (sentiment: 'positive' | 'negative') => {
    try {
      await submitFeedback({ sentiment, message: feedbackText, tags });
    } catch {
      // Error handled by hook
    }
  };

  const renderDialog = (open: boolean, setOpen: (v: boolean) => void, sentiment: 'positive' | 'negative') => {
    const isPositive = sentiment === 'positive';
    return (
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centered}>
            <Pressable style={styles.popup} onPress={(e: { stopPropagation: () => void }) => e.stopPropagation()}>
              <Text style={styles.dialogTitle}>{isPositive ? 'What do you like?' : "What don't you like?"}</Text>
              <Text style={styles.dialogDescription}>
                {isPositive
                  ? "Tell us what you're enjoying about the app"
                  : "Help us improve by sharing what's not working for you"}
              </Text>

              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={5}
                value={feedbackText}
                onChangeText={setFeedbackText}
                placeholder={isPositive ? 'Share your positive feedback...' : 'Share your concerns or suggestions...'}
                placeholderTextColor="#999"
                textAlignVertical="top"
              />

              <View style={styles.dialogActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setOpen(false);
                    setFeedbackText('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                  onPress={() => handleDialogSubmit(sentiment)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handlePositiveClick} activeOpacity={0.7}>
            <HappyIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNegativeClick} activeOpacity={0.7}>
            <SadIcon />
          </TouchableOpacity>
        </View>
      </View>

      {renderDialog(positiveOpen, setPositiveOpen, 'positive')}
      {renderDialog(negativeOpen, setNegativeOpen, 'negative')}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bcbec4',
    backgroundColor: '#f9f9f9',
    maxWidth: 400,
  },
  title: {
    fontSize: 16,
    color: '#1a1a1a',
    flexShrink: 1,
    marginRight: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    padding: 12,
    borderRadius: 6,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  dialogDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 120,
    marginBottom: 16,
    color: '#1a1a1a',
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0066cc',
    borderRadius: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
});
