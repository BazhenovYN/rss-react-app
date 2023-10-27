import { Component, ReactNode, createContext } from 'react';
import type { Message } from './types';
import NotificationList from './NotificationList';

interface ContextProps {
  showMessage: (text: string) => void;
}

interface Props {
  children: ReactNode;
}

interface State {
  listOfMessages: Message[];
}

const NotificationContext = createContext<ContextProps>({
  showMessage: () => null,
});

const AUTO_CLOSE_DURATION = 5000;

export class NotificationProvider extends Component<Props, State> {
  state: State = {
    listOfMessages: [],
  };

  showMessage = (text: string) => {
    const newMessage = {
      id: Date.now(),
      text,
    };
    this.setState({
      listOfMessages: [...this.state.listOfMessages, newMessage],
    });

    setTimeout(() => {
      this.removeMessage(newMessage.id);
    }, AUTO_CLOSE_DURATION);
  };

  removeMessage = (id: number) => {
    this.setState({
      listOfMessages: this.state.listOfMessages.filter(
        (message) => message.id !== id
      ),
    });
  };

  render() {
    const value = { showMessage: this.showMessage };
    return (
      <NotificationContext.Provider value={value}>
        {this.props.children}
        <NotificationList listOfMessages={this.state.listOfMessages} />
      </NotificationContext.Provider>
    );
  }
}

export default NotificationContext;
