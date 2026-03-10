import { FeedbackForm } from '@usermap/sdk-react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Example App</h1>
        <p>This is a standalone React application demonstrating the Usermap React SDK.</p>
      </header>

      <main className="app-content">
        <section className="demo-section">
          <h2>Try it out</h2>
          <div className="form-wrapper">
            <FeedbackForm
              tags={{
                screen: 'landing',
                isAnonymousUser: 'true',
              }}
              token="um_qS4V-nmCpoj-Ae"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
