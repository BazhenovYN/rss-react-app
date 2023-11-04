import { ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function Button({ startIcon, endIcon, className, children, ...rest }: Props) {
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

export default Button;
