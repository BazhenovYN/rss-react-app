import { FaSkullCrossbones } from 'react-icons/fa';
import styles from './ErrorFallback.module.scss';

interface Props {
  message?: string;
}

function ErrorFallback({ message }: Props) {
  return (
    <div className={styles.container}>
      <FaSkullCrossbones className={styles.icon} />
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorFallback;
