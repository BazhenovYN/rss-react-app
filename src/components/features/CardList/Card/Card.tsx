import { FaChevronRight } from 'react-icons/fa';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import type { IPeople } from '@/types';

import styles from './Card.module.scss';

interface Props {
  content: IPeople;
}

function Card({ content }: Props) {
  const {
    id: characterId,
    name,
    gender,
    height,
    skin_color: skinColor,
    hair_color: hairColor,
  } = content;

  const [searchParams] = useSearchParams();

  const { id } = useParams<'id'>();
  const isShowDetails = characterId.toString() === id;

  const generateLink = () => {
    if (isShowDetails) {
      return `/?${searchParams.toString()}`;
    }
    return `/characters/${characterId}/?${searchParams.toString()}`;
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
            <Link to={generateLink()}>
              <FaChevronRight
                className={
                  isShowDetails
                    ? `${styles.icon} ${styles.active}`
                    : styles.icon
                }
              />
            </Link>
          </div>
        </div>
        {isShowDetails && <Outlet />}
      </div>
    </>
  );
}

export default Card;
