import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'

export const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchOrders = useCallback(async () => {
        try {
        const fetched = await request('/api/order/all', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setOrders(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    if (loading) {
        return <Loader/>
    }

    return (
            <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>владелец</th>
                    <th>содержимое</th>
                    <th>создан</th>
                    <th>общая стоимость</th>
                    <th>статус</th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order, index) => (
                    <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.owner}</td>
                    <td>{order.items.map((element) => element.name).join(', ')}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                    </tr>
                ))}
            </tbody>
            </table>
    )
}