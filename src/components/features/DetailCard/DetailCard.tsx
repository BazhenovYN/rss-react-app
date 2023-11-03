import { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import styles from './DetailCard.module.scss';
import { IPeople } from '@/types';
import { getApiDataById } from '@/services/sw-service';

function DetailCard() {
  const [searchParams] = useSearchParams();
  const { id } = useParams<'id'>();
  const [data, setData] = useState<IPeople | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!id) {
        return;
      }
      const apiData = await getApiDataById(id);
      setData(apiData);
    };
    getData();
  }, [id]);

  if (!data) {
    return null;
  }

  const generateLink = () => {
    return `/?${searchParams.toString()}`;
  };

  return (
    <div className={styles.card}>
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
      <Link to={generateLink()} className={styles.close}>
        <MdOutlineClose className={styles.icon} />
      </Link>
    </div>
  );
}
export default DetailCard;
