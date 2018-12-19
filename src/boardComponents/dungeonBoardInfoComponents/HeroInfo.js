import React from 'react';

export default function HeroInfo(props) {
  const { name, baseHP, currentHP } = props;

  return (
    <div>
      <h3>{name}</h3>
      <ul className="list-unstyled ml-3">
        <li>Base HP: {baseHP}</li>
        <li>Current HP: {currentHP}</li>
      </ul>
    </div>
  )
}
