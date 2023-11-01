import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './Pagination.module.scss';

interface Props {
  count: number;
  currentPage: number;
}

function Pagination({ count, currentPage }: Props) {
  if (count < 2) {
    return null;
  }

  const getPageLink = (page: number) => {
    return page === 1 ? '/' : `/?page=${page}`;
  };

  const getPrevPageLink = () => {
    return currentPage > 2 ? `/?page=${currentPage - 1}` : '/';
  };

  const getNextPageLink = () => {
    return currentPage < count
      ? `/?page=${currentPage + 1}`
      : `/?page=${count}`;
  };

  const items = [];

  for (let i = 1; i <= count; i++) {
    const className =
      i === currentPage ? `${styles.item} ${styles.active}` : styles.item;

    items.push(
      <Link to={getPageLink(i)} key={i} className={className}>
        {i}
      </Link>
    );
  }

  return (
    <div className={styles.pagination}>
      <Link to={getPrevPageLink()} className={styles.item}>
        <FaChevronLeft />
      </Link>
      {items}
      <Link to={getNextPageLink()} className={styles.item}>
        <FaChevronRight />
      </Link>
    </div>
  );
}

export default Pagination;
