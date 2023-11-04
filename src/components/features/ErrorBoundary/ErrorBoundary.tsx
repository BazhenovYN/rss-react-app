import { Component, ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

interface Props {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.log(error.message);
  }

  render() {
    const { error } = this.state;
    if (error) {
      const message = this.state.error?.message;
      return <ErrorFallback message={message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
