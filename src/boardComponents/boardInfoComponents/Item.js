import React from 'react'

export default function Item(props) {
  const { item, selectingDiscard, setItemDiscardId, discardIdSeclected } = props;

  let className;
  if (selectingDiscard && discardIdSeclected === item.id) {
    className = "col-sm-5 border border-warning my-2";
  }
  else if (selectingDiscard) {
    className = "col-sm-5 border border-secondary my-2";
  }
  else {
    className = "col-sm-5 my-2";
  }

  function onClick() {
    if(selectingDiscard) {
      setItemDiscardId(item.id);
    }
  }

  return (
    <div className={className} onClick={onClick}>
      <h5>{item.name}</h5>
      <p>{item.text}</p>
    </div>
  )
}
