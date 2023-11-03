import { FaSpinner } from 'react-icons/fa';

import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.loading}>
      <FaSpinner className={styles.spinner} />
      <span>Loading...</span>
    </div>
  );
}

export default Loader;
