import { Component } from 'react';
import styles from './NotificationItem.module.scss';

interface Props {
  text: string;
}

export default class NotificationItem extends Component<Props> {
  render() {
    return (
      <div className={styles.notification}>
        <div className={styles.message}>{this.props.text}</div>
      </div>
    );
  }
}
