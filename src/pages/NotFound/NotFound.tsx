import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <Link to="/">
        <Button>Back Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
