import styles from './TextField.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

function TextField({ className, ...rest }: Props) {
  const classes = `${styles.input} ${className ? className : ''}`.trimEnd();
  return <input className={classes} {...rest} />;
}

export default TextField;
