import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

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
    if (count === 1) {
      return '/';
    } else if (currentPage < count) {
      return `/?_page=${currentPage + 1}`;
    }
    return `/?_page=${count}`;
  };

  const items = [];

  for (let i = 1; i <= count; i++) {
    const className =
      i === currentPage ? `${styles.item} ${styles.active}` : styles.item;

    items.push(
      <Link href={getPageLink(i)} key={i} className={className} shallow>
        {i}
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <nav aria-label="pagination" className={styles.pagination}>
        <Link href={getPrevPageLink()} className={styles.item} shallow>
          <FaChevronLeft />
        </Link>
        {items}
        <Link href={getNextPageLink()} className={styles.item} shallow>
          <FaChevronRight />
        </Link>
      </nav>
    </div>
  );
}

export default Pagination;
