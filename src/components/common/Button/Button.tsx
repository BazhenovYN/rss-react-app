import { Component, ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props extends ComponentPropsWithoutRef<'button'> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default class Button extends Component<Props> {
  render() {
    const { startIcon, endIcon, className, children, ...rest } = this.props;
    const classes = `${styles.btn} ${className ? className : ''}`.trimEnd();
    return (
      <button type="button" className={classes} {...rest}>
        <span className={styles.content}>
          {startIcon}
          {children}
          {endIcon}
        </span>
      </button>
    );
  }
}
