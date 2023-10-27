import { Component } from 'react';
import { EmptyObject } from '@/types';

class ComponentThatThrowError extends Component<EmptyObject> {
  constructor(props: EmptyObject) {
    super(props);
    throw new Error('Oops! Our Death Star just exploded...');
  }

  render() {
    return <div>BOOM!</div>;
  }
}

export default ComponentThatThrowError;
