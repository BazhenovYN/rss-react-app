import SearchView from '@/components/features/SearchView';
import ShowError from '@/components/features/ShowError';

import styles from './Home.module.scss';

function Home() {
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

export default Home;
