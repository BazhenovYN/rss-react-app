import { Component } from 'react';
import SearchView from '@/components/features/SearchView';
import ShowError from '@/components/features/ShowError';

import styles from './Home.module.scss';

export default class Home extends Component {
  render() {
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
}
