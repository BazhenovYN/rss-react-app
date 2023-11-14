import { skipToken } from '@reduxjs/toolkit/query/react';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Loader from '@/components/features/Loader';
import { useGetDataByIdQuery } from '@/services/star-wars';

import styles from './DetailCard.module.scss';

function DetailCard() {
  const [searchParams] = useSearchParams();
  const { id } = useParams<'id'>();
  const { data, isLoading } = useGetDataByIdQuery(id ?? skipToken);

  const generateLink = () => {
    return `/?${searchParams.toString()}`;
  };

  return (
    <div className={styles['detail-card']} data-testid="detail-card">
      {isLoading && (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      )}
      {!isLoading && data && (
        <>
          <div className={styles.item}>
            <span>Gender: </span>
            <span>{data.gender}</span>
          </div>
          <div className={styles.item}>
            <span>Birth year: </span>
            <span>{data.birth_year}</span>
          </div>
          <div className={styles.item}>
            <span>Height: </span>
            <span>{data.height}</span>
          </div>
          <div className={styles.item}>
            <span>Mass: </span>
            <span>{data.mass}</span>
          </div>
          <div className={styles.item}>
            <span>Skin color: </span>
            <span>{data.skin_color}</span>
          </div>
          <div className={styles.item}>
            <span>Hair color: </span>
            <span>{data.hair_color}</span>
          </div>
          <div className={styles.item}>
            <span>Eye color: </span>
            <span>{data.eye_color}</span>
          </div>
          <div className={styles.item}>
            <span>Homeworld: </span>
            <span>{data.homeworld}</span>
          </div>
          <div>Films:</div>
          <ul className={styles.films}>
            {data.films.map((film) => (
              <li key={film}>{film}</li>
            ))}
          </ul>
        </>
      )}
      <Link to={generateLink()} className={styles.close} role="button">
        <MdOutlineClose className={styles.icon} />
      </Link>
    </div>
  );
}
export default DetailCard;
