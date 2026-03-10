# @usermap/sdk-react-native

The official React Native SDK for [Usermap](https://usermap.app) — finally start listening to your users.

## Installation

```bash
npm install @usermap/sdk-react-native @usermap/sdk-core react-native-svg
```

> **Note:** This package has peer dependencies on `react`, `react-native`, and `react-native-svg`.

## Quick Start

Drop in the `FeedbackForm` component with your product token. To start collecting feedback, create an **api token** in the [Usermap dashboard](https://usermap.app).

```tsx
import { FeedbackForm } from '@usermap/sdk-react-native';

function App() {
  return <FeedbackForm token="your-api-key" />;
}
```

That's it! Your users will see a compact feedback widget. Tapping a button immediately submits the sentiment, then opens a modal where the user can optionally add a quick message.

## Components

### `<FeedbackForm />`

A self-contained feedback widget with built-in modals for collecting user sentiment and optional written feedback.

| Prop        | Type                     | Required | Default                             | Description                                      |
| ----------- | ------------------------ | -------- | ----------------------------------- | ------------------------------------------------ |
| `token`     | `string`                 | ✅       | —                                   | Your Usermap product token for authentication.   |
| `apiUrl`    | `string`                 | —        | `https://api.usermap.app/v0`        | Custom API endpoint URL.                         |
| `title`     | `string`                 | —        | `"How do you like the app so far?"` | The prompt displayed next to the buttons.        |
| `onSuccess` | `() => void`             | —        | —                                   | Called after feedback is successfully submitted. |
| `onError`   | `(error: Error) => void` | —        | —                                   | Called when an error occurs during submission.   |

## Hooks

### `useSubmitFeedback`

If you want full control over the UI, you can use the `useSubmitFeedback` hook directly to submit feedback to the Usermap API.

```tsx
import { useSubmitFeedback } from '@usermap/sdk-react-native';

function CustomFeedback() {
  const { submitFeedback, isLoading } = useSubmitFeedback({
    token: 'your-api-key',
    onSuccess: () => console.log('Feedback sent!'),
    onError: (err) => console.error(err),
  });

  return (
    <Button
      title={isLoading ? 'Sending...' : '👍 Send Feedback'}
      disabled={isLoading}
      onPress={() => submitFeedback({ sentiment: 'positive', message: 'Great app!' })}
    />
  );
}
```

## Shared Core

This SDK shares its hooks, types, and API client with `@usermap/sdk-react` via the `@usermap/sdk-core` package. If you're building a cross-platform app, both SDKs will use the same underlying logic.

## License

MIT
