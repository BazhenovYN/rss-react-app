import { Component } from 'react';
import SearchPanel from '@/components/features/SearchPanel';
import styles from './Home.module.scss';

export default class Home extends Component {
  render() {
    return (
      <>
        <section>
          <div className={styles.home}>
            <h1>Star Wars</h1>
            <SearchPanel />
          </div>
        </section>
      </>
    );
  }
}
