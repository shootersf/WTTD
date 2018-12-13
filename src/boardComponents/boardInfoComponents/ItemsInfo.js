import React from 'react';
import Item from './Item';

export default function ItemsInfo(props) {
  const { items } = props;
  const output = items.map( item => <Item key={item.id} item={item} />)

  return (
    <div className="container">
      <div className="row">
        {output}
      </div>
    </div>
  )
}
