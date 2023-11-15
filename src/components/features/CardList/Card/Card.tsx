import { FaChevronRight } from 'react-icons/fa';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import IconButton from '@/components/common/IconButton';
import {
  hideDetails,
  selectIsShowDetails,
  showDetails,
} from '@/store/searchSlice';
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

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const detailId = searchParams.get('_details');
  const isShowDetails = useAppSelector(selectIsShowDetails);

  const isShowDetailsOfCard = isShowDetails && detailId === id.toString();

  const handleDetails = () => {
    if (isShowDetailsOfCard) {
      dispatch(hideDetails());
      setSearchParams((searchParams) => {
        searchParams.delete('_details');
        return searchParams;
      });
    } else {
      dispatch(showDetails());
      setSearchParams((searchParams) => {
        searchParams.set('_details', id.toString());
        return searchParams;
      });
    }
  };

  return (
    <>
      <div
        className={
          isShowDetailsOfCard ? `${styles.card} ${styles.active}` : styles.card
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
              onClick={handleDetails}
              className={isShowDetailsOfCard ? styles.active : ''}
            >
              <FaChevronRight />
            </IconButton>
          </div>
        </div>
        {isShowDetailsOfCard && <Outlet />}
      </div>
    </>
  );
}

export default Card;
