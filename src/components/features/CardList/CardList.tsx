import { Component } from 'react';
import Card from './Card';
import type { IPeople } from '@/types';

interface Props {
  items: IPeople[];
}

export default class CardList extends Component<Props> {
  render() {
    const { items } = this.props;
    if (!items.length) {
      return <p>Nothing found</p>;
    }

    return (
      <div>
        {this.props.items.map((item) => {
          return <Card key={item.url} content={item} />;
        })}
      </div>
    );
  }
}
