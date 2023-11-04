import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './TextField.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => {
    const classes = `${styles.input} ${className ? className : ''}`.trimEnd();
    return <input ref={ref} className={classes} {...rest} />;
  }
);

export default TextField;
