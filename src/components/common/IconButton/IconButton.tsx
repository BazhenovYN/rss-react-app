import { ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.scss';

function IconButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = [styles.icon, className].join(' ').trimEnd();
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default IconButton;
