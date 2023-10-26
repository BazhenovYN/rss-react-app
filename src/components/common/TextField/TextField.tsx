import { Component } from 'react';
import styles from './TextField.module.scss';

type Props = React.ComponentPropsWithoutRef<'input'>;

export default class TextField extends Component<Props> {
  render() {
    const { className, ...rest } = this.props;
    const classes = `${styles.input} ${className ? className : ''}`.trimEnd();
    return <input className={classes} {...rest} />;
  }
}
