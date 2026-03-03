# @usermap/sdk-react

The official React SDK for [Usermap](https://usermap.app) — finally start listening to your users.

## Installation

```bash
npm install @usermap/sdk-react
```

> **Note:** This package has peer dependencies on `react` and `react-dom` (v19+).

## Quick Start

Import the `FeedbackForm` component and render it anywhere in your app. To start collecting feedback, create an **api token** in the [Usermap dashboard](https://usermap.app).

```tsx
import { FeedbackForm } from '@usermap/sdk-react';

function App() {
  return <FeedbackForm token="your-api-key" />;
}
```

That's it! Your users will see a compact feedback widget. Clicking a button immediately submits the sentiment, then opens a dialog where the user can optionally add a quick message.

## Components

### `<FeedbackForm />`

A self-contained feedback widget with built-in dialogs for collecting user sentiment and optional written feedback.

| Prop    | Type     | Required | Default                             | Description                                    |
| ------- | -------- | -------- | ----------------------------------- | ---------------------------------------------- |
| `token` | `string` | ✅       | —                                   | Your Usermap product token for authentication. |
| `title` | `string` | —        | `"How do you like the app so far?"` | The prompt displayed next to the buttons.      |

#### Example with custom title

```tsx
<FeedbackForm token="your-product-token" title="Enjoying this feature?" />
```

## Hooks

### `useSubmitFeedback`

If you want full control over the UI, you can use the `useSubmitFeedback` hook directly to submit feedback to the Usermap API.

```tsx
import { useState } from 'react';
import { useSubmitFeedback } from '@usermap/sdk-react';

function CustomFeedback() {
  const [message, setMessage] = useState('');
  const { submitFeedback, isLoading } = useSubmitFeedback({
    token: 'your-api-key',
    onSuccess: () => {
      setMessage('');
      console.log('Feedback sent!');
    },
    onError: (err) => console.error(err),
  });

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your feedback..." />
      <button disabled={isLoading} onClick={() => submitFeedback({ sentiment: 'positive', message })}>
        {isLoading ? 'Sending...' : '👍 Send Feedback'}
      </button>
    </div>
  );
}
```

## License

MIT
