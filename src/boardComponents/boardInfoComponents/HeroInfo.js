import React from 'react'

export default function HeroInfo(props) {
  const { name, startHP, totalHP } = props;

  return (
    <div>
      <h3>{name}</h3>
      <ul>
        <li>Starting HP: {startHP}</li>
        <li>Total HP: {totalHP}</li>
      </ul>
    </div>
  )
}
