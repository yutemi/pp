import React from 'react'
export const ItemCard = ({ item }) => {
  return (
    <div className='container'>
        {item.name}
        <img src={item.imageurl} alt="sepul"/>
        <p>{item.desc}</p>
        <p>цена: {item.price}</p>
        <a className='btn'>добавить в корзину</a>
    </div>
  )
}