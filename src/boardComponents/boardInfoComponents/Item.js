import React from 'react'

export default function Item(props) {
  const { item } = props;
  return (
    <div className="col-sm-6">
      <h5>{item.name}</h5>
      <p>{item.text}</p>
    </div>
  )
}
