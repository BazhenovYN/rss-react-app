import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import RssLogo from '@/assets/svg/rss.svg?react';

import styles from './Footer.module.scss';

const AUTHOR = 'Bazhenov Iurii';
const YEAR_OF_CREATION = 2023;

function Footer() {
  return (
    <footer className={styles.container}>
      <Link to="https://github.com/BazhenovYN/" className={styles.link}>
        <FaGithub className={styles.icon} />
      </Link>
      <div>
        © {YEAR_OF_CREATION} {AUTHOR}
      </div>
      <Link to="https://rs.school/js/" className={styles.link}>
        <RssLogo className={styles.logo} />
      </Link>
    </footer>
  );
}

export default Footer;
