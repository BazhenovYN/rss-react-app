import { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import styles from './Loader.module.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <FaSpinner className={styles.spinner} />
        <span>Loading...</span>
      </div>
    );
  }
}
