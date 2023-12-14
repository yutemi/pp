import React from "react"

export const OrdersList = ({ orders }) => {
    if (!orders.length) {
        return 
    }

    return (
        <table>
        <thead>
            <tr>
                <th>№</th>
                <th>дата оформления</th>
                <th>цена</th>
                <th>статус</th>
            </tr>
        </thead>

        <tbody>
        { orders.map((order, index) => {
            return (
                <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                </tr>
                )
            }
            )
        }
        </tbody>
        </table>
    )
}