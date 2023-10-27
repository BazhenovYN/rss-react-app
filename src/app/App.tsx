import { Component } from 'react';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import { NotificationProvider } from '@/components/features/NotificationManager';
import Home from '@/pages/Home';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <NotificationProvider>
          <main>
            <Home />
          </main>
        </NotificationProvider>
      </ErrorBoundary>
    );
  }
}
