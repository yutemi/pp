import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const { loading, request } = useHttp();
    const { token, auth } = useContext(AuthContext);
    const navigate = useNavigate()

    const createOrder = async (cartItems) => {
        try {
            await axios.post(`/api/order/create`, null, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
            });
            navigate("/")
            alert("ваш заказ создан")
        } catch (e) {
            console.error('Error creating order:', e.message);
        }
    };

    const onDelete = async (itemId) => {
        try {
            await axios.delete(`/api/cart/del/${itemId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
            });
            setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (e) {
            console.error('Error deleting item from cart:', e.message);
        }
    };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setCartItems(response.data.items);
      } catch (e) {}
    };
    fetchCartItems();
  }, [token, request]);

  
  if (loading) {
    return ( 
        <Loader />
    )
  }
  if (!cartItems.length) {
    return (
        <p className="center">корзина пуста</p>
    )
  }

  return (
    <div>
        <div>
            {cartItems.map((cartItem) => (
                <div key={cartItem._id} className="cart-item">
                    <div>
                        <p>{cartItem.name}</p>
                        <p>{cartItem.price}</p>
                    </div>
                    <div className="b">
                        <button className="btn" onClick={() => onDelete(cartItem._id)}>
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <div className="b-large">
            <button className="btn-large" onClick={() => createOrder(cartItems)}>Заказать</button>
        </div>
    </div>
  );
};
