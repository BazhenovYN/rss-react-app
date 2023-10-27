import { Component } from 'react';
import NotificationItem from './NotificationItem';
import type { Message } from './types';

import styles from './NotificationList.module.scss';

interface Props {
  listOfMessages: Message[];
}

export default class NotificationList extends Component<Props> {
  render() {
    return (
      <div className={styles.list}>
        {this.props.listOfMessages.map((message) => {
          return <NotificationItem key={message.id} text={message.text} />;
        })}
      </div>
    );
  }
}
