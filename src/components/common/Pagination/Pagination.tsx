import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './Pagination.module.scss';

interface Props {
  count: number;
  currentPage: number;
}

function Pagination({ count, currentPage }: Props) {
  const getPageLink = (page: number) => {
    return page === 1 ? '/' : `/?_page=${page}`;
  };

  const getPrevPageLink = () => {
    return currentPage > 2 ? `/?_page=${currentPage - 1}` : '/';
  };

  const getNextPageLink = () => {
    return currentPage < count
      ? `/?_page=${currentPage + 1}`
      : `/?_page=${count}`;
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
    <div className={styles.container}>
      <div className={styles.pagination}>
        <Link to={getPrevPageLink()} className={styles.item}>
          <FaChevronLeft />
        </Link>
        {items}
        <Link to={getNextPageLink()} className={styles.item}>
          <FaChevronRight />
        </Link>
      </div>
      <div className={styles.select}>
        <div>Items per page:</div>
        <select name="per-page">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
