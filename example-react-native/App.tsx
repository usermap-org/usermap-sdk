import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedbackForm } from '@usermap/sdk-react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.heading}>Usermap SDK Demo</Text>
          <Text style={styles.subtitle}>React Native Example</Text>

          <View style={styles.feedbackContainer}>
            <FeedbackForm
              title="Wie ist die app?"
              token="um_qS4V-nmCpoj-Ae"
              onError={(error) => Alert.alert('Error', error.message)}
            />
          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
  },
  feedbackContainer: {
    width: '100%',
    maxWidth: 400,
  },
});
