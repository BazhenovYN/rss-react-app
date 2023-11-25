import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import RssLogo from '@/assets/svg/rss.svg';

import styles from './Footer.module.scss';

const AUTHOR = 'Bazhenov Iurii';
const YEAR_OF_CREATION = 2023;

function Footer() {
  return (
    <footer className={styles.container}>
      <Link href="https://github.com/BazhenovYN/" className={styles.link}>
        <FaGithub className={styles.icon} />
      </Link>
      <div>
        © {YEAR_OF_CREATION} {AUTHOR}
      </div>
      <Link href="https://rs.school/js/" className={styles.link}>
        <RssLogo className={styles.logo} />
      </Link>
    </footer>
  );
}

export default Footer;
