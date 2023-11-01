import Card from './Card';
import type { IPeople } from '@/types';

import styles from './CardList.module.scss';

interface Props {
  items: IPeople[];
}

function CardList({ items }: Props) {
  if (!items.length) {
    return <h2>Nothing found</h2>;
  }

  return (
    <div className={styles.container}>
      {items.map((item) => {
        return <Card key={item.url} content={item} />;
      })}
    </div>
  );
}

export default CardList;
