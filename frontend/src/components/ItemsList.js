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
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
        } catch (e) {
        console.error('Error adding item to cart:', e.message);
        }
    };

    if (!items.length) {
        return <p className="center">предметов пока нет</p>;
    }

    const chunkItems = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const itemsInRows = chunkItems(items, 3);

    return (
        <div>
            <h1>распродажа сепулек!</h1>
            {itemsInRows.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((item) => (
                        <ItemCard key={item._id} item={item} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            ))}
        </div>
    );
};