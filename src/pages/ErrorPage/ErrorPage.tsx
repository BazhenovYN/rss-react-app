import { FaSkullCrossbones } from 'react-icons/fa';
import { Link, useRouteError } from 'react-router-dom';
import Button from '@/components/common/Button';

import styles from './ErrorPage.module.scss';

function ErrorPage() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'Unexpected error';

  return (
    <div className={styles.container}>
      <FaSkullCrossbones className={styles.icon} />
      <h3>Something went wrong</h3>
      <p>
        <i>{message}</i>
      </p>
      <Link to="/">
        <Button>Back Home</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
