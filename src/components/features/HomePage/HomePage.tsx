import SearchView from '@/components/features/SearchView';
import ShowError from '@/components/features/ShowError';

import styles from './HomePage.module.scss';

function HomePage() {
  return (
    <>
      <section className={styles.home}>
        <h1>Star Wars</h1>
        <ShowError />
        <SearchView />
      </section>
    </>
  );
}

export default HomePage;
