import { useState } from 'react';
import { GiDeathStar } from 'react-icons/gi';
import Button from '@/components/common/Button';
import ComponentThatThrowError from './ComponentThatThrowError';

import styles from './ShowError.module.scss';

function ShowError() {
  const [isShowBabComponent, setIsShowBabComponent] = useState(false);

  const handleClick = () => {
    setIsShowBabComponent(true);
  };

  return (
    <div className={styles.container}>
      <Button
        type="button"
        className={styles['warning-btn']}
        onClick={handleClick}
        startIcon={<GiDeathStar />}
      >
        Destroy Yavin
      </Button>
      {isShowBabComponent ? <ComponentThatThrowError /> : null}
    </div>
  );
}

export default ShowError;
