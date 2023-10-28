import { Component } from 'react';
import { FaSkullCrossbones } from 'react-icons/fa';

import styles from './ErrorFallback.module.scss';

interface Props {
  message?: string;
}

export default class ErrorFallback extends Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        <FaSkullCrossbones className={styles.icon} />
        <h3>Something went wrong</h3>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
