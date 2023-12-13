import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { OrdersList } from '../components/OrdersList'

export const ProfilePage = () => {
    const [orders, setOrders] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchOrders = useCallback(async () => {
        try {
            const fetched = await request('/api/order', 'GET', null, {
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
    return(
        <div>
            <h1>
                ваши заказы
            </h1>
            {!loading && <OrdersList orders={orders} />}
        </div>
    )
}
