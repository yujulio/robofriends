import React from 'react'
import Card from './Card'

const CardList = ({ robots }) => {

  // throw new Error('Fulcck')

  const cardArray = robots.map( user => {
    return <Card key={user.id} id={user.id} name={user.name} email={user.email}/>
  })

  return (
    <React.Fragment>
      {cardArray}
    </React.Fragment>
  );
}

export default CardList;