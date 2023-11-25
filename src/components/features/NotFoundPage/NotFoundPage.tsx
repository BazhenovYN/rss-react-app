import Link from 'next/link';
import Button from '@/components/common/Button';

import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <Link href="/">
        <Button>Back Home</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
