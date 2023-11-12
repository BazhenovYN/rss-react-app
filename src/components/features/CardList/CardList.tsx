import Card from './Card';
import { useSearchContext } from '@/context/SearchContext';

import styles from './CardList.module.scss';

function CardList() {
  const { data } = useSearchContext();
  if (!data) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        {data.results.map((item) => {
          return <Card key={item.id} content={item} />;
        })}
      </div>
      {data.results.length === 0 && <h2>Nothing found</h2>}
    </>
  );
}

export default CardList;
