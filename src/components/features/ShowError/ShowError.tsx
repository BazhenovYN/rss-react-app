import { Component } from 'react';
import { GiDeathStar } from 'react-icons/gi';
import Button from '@/components/common/Button';
import type { EmptyObject } from '@/types';
import ComponentThatThrowError from './ComponentThatThrowError';

import styles from './ShowError.module.scss';

interface State {
  isShowBabComponent: boolean;
}

export default class ShowError extends Component<EmptyObject, State> {
  state: State = {
    isShowBabComponent: false,
  };

  handleClick = () => {
    this.setState({ isShowBabComponent: true });
  };

  render() {
    const { isShowBabComponent } = this.state;
    return (
      <div className={styles.container}>
        <Button
          type="button"
          className={styles['warning-btn']}
          onClick={this.handleClick}
          startIcon={<GiDeathStar />}
        >
          Destroy Yavin
        </Button>
        {isShowBabComponent ? <ComponentThatThrowError /> : null}
      </div>
    );
  }
}
