import React, {useState, useContext,useEffect} from "react";
import axios from "axios";
import { ItemCard } from "./ItemCard";
import { AuthContext } from "../context/AuthContext";

export const ItemsList = () => {
    const [items, setItems] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchItems = async () => {
        try {
            const response = await axios.get('/api/item/')
            setItems(response.data)
        } catch (e) {
            console.error('Error fetching items:', e.message);
        }
        };
        fetchItems();
    }, []);

    const handleAddToCart = async (itemId) => {
        try {
            const response = await axios.post(`/api/cart/add/${itemId}`, null, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
        console.error('Error adding item to cart:', e.message);
        }
    };

    if (!items.length) {
        return <p className="center">предметов пока нет</p>;
    }

    return (
        <div>
        <h1>распродажа сепулек!</h1>
        <div className="row">
            {items.map((item) => (
                <ItemCard key={item._id} item={item} onAddToCart={handleAddToCart} />
            ))}
        </div>
        </div>
    );
};