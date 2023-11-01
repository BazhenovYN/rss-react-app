import { FaChevronRight } from 'react-icons/fa';
import Button from '@/components/common/Button';
import type { IPeople } from '@/types';

import styles from './Card.module.scss';

interface Props {
  content: IPeople;
}

function Card({ content }: Props) {
  const {
    name,
    gender,
    height,
    skin_color: skinColor,
    hair_color: hairColor,
  } = content;

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.description}>
        <div className={styles.characteristics}>
          <div className={styles.item}>
            <span>Gender: </span>
            <span>{gender}</span>
          </div>
          <div className={styles.item}>
            <span>Height: </span>
            <span>{height}</span>
          </div>
          <div className={styles.item}>
            <span>Skin color: </span>
            <span>{skinColor}</span>
          </div>
          <div className={styles.item}>
            <span>Hair color: </span>
            <span>{hairColor}</span>
          </div>
        </div>
        <div className={styles.details}>
          <Button endIcon={<FaChevronRight />}>Details</Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
