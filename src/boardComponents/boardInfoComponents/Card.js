import React from 'react'

export default function Card(props) {
  const { name, strength } = props.card;

  return (
    <div>
      <h4>Name : {name}</h4>
      <p>Strength: {strength}</p>
    </div>
  )
}
