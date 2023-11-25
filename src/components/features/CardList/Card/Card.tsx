import { useRouter } from 'next/router';
import { FaChevronRight } from 'react-icons/fa';
import IconButton from '@/components/common/IconButton';
import DetailCard from '@/components/features/DetailCard';
import type { IPeople } from '@/types';

import styles from './Card.module.scss';

interface Props {
  content: IPeople;
}

function Card({ content }: Props) {
  const {
    id,
    name,
    gender,
    height,
    skin_color: skinColor,
    hair_color: hairColor,
  } = content;

  const router = useRouter();
  const { _details, ...queryWithoutDetails } = router.query;
  const detailsId = typeof _details === 'string' ? _details : '';

  const isShowDetails = detailsId === id.toString();

  const openDetails = () => {
    router.push(
      {
        query: { ...router.query, _details: id },
      },
      undefined,
      { shallow: true }
    );
  };

  const closeDetails = () => {
    router.push(
      {
        query: { ...queryWithoutDetails },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div
        className={
          isShowDetails ? `${styles.card} ${styles.active}` : styles.card
        }
        data-testid="card"
      >
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
          <div className={styles['btn-container']}>
            <IconButton
              onClick={isShowDetails ? closeDetails : openDetails}
              className={isShowDetails ? styles.active : ''}
            >
              <FaChevronRight />
            </IconButton>
          </div>
        </div>
        {isShowDetails && <DetailCard onClose={closeDetails} />}
      </div>
    </>
  );
}

export default Card;
