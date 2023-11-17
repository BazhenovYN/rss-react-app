import Card from './Card';
import { IPeople } from '@/types';

import styles from './CardList.module.scss';

interface Props {
  items: IPeople[];
}

function CardList({ items }: Props) {
  return (
    <>
      <div className={styles.container}>
        {items.map((item) => {
          return <Card key={item.id} content={item} />;
        })}
      </div>
      {items.length === 0 && <h2>Nothing found</h2>}
    </>
  );
}

export default CardList;
