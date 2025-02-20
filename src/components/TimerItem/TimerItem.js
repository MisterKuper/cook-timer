import React from 'react'
import './TimerItem.css'
import { Link } from 'react-router-dom'

function TimerItem({ name, time} ) {
  return (
    <div className='timer-container'>
      <Link to={`/timer/${name}/${time}`}>
        <div className='timer-inner-block'>
          <h3>{name}</h3>
          <p>Cooking time: <span>{time} min</span></p>
        </div>
      </Link>
    </div>
  )
}

export default TimerItem
