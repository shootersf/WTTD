import React from 'react';
import Item from './Item';

export default function ItemsInfo(props) {
  const { items } = props;
  const output = items.map( item => 
    <React.Fragment key={item.id}>
    <Item key={item.id} item={item} />
    {/* Add a spacing column of one */}
    <div className="col-sm-1"></div>  
    </React.Fragment>
  )

  return (
    <div className="container">
      <div className="row">
        {output}
      </div>
    </div>
  )
}
