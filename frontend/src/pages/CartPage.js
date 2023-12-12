import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {ItemsList} from '../components/ItemsList'

export const CartPage = () => {
  const [items, setItems] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchItems = useCallback(async () => {
    try {
      const fetched = await request('/api/item', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setItems(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <ItemsList items={items} />}
    </>
  )
}