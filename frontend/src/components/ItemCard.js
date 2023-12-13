import React from "react"

export const ItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="card">
        <div className="card-image">
            <img src={item.imageurl} alt="sepul1" />
        </div>
        <div className="card-content">
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <p>цена: {item.price}</p>
        </div>
        <button onClick={() => onAddToCart(item._id)}>добавить в корзину</button>
    </div>
  );
};