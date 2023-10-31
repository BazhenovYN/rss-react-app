import { Component } from 'react';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import Home from '@/pages/Home';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <main>
          <Home />
        </main>
      </ErrorBoundary>
    );
  }
}
