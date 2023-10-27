import { Component } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Button from '@/components/common/Button';
import type { IPeople } from '@/types';

import styles from './Card.module.scss';

interface Props {
  content: IPeople;
}

export default class Card extends Component<Props> {
  render() {
    const {
      name,
      gender,
      height,
      skin_color: skinColor,
      hair_color: hairColor,
    } = this.props.content;
    return (
      <div className={styles.card}>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <div>
            <span>Gender: </span>
            <span>{gender}</span>
          </div>
          <div>
            <span>Height: </span>
            <span>{height}</span>
          </div>
          <div>
            <span>Skin color: </span>
            <span>{skinColor}</span>
          </div>
          <div>
            <span>Hair color: </span>
            <span>{hairColor}</span>
          </div>
          <Button className={styles.details} endIcon={<FaChevronRight />}>
            Details
          </Button>
        </div>
      </div>
    );
  }
}
