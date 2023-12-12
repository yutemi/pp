import React, { useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { ItemCard } from "../components/ItemCard"

export const ItemPage = () => {
    const {request, loading} = useHttp()
    const [item, setItem] = useState(null)
    const itemId = useParams().id

    const getItem = useCallback(async () => {
        try {
            const fetched = await request(`/api/item/${itemId}`, "GET", null)
            setItem(fetched)
        } catch (e) {}
    }, [itemId, request])

    useEffect(() => {
        getItem()
    }, [getItem])

    if (loading){
        return <Loader />
    }

    return(
        <>
            {!loading && item && <ItemCard item={item} />}
        </>
    )
}   