import React, { useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useParams } from "react-router-dom"
import { Loader } from "../components/Loader"
import { ItemCard } from "../components/ItemCard"
import Axios from "axios"

export const ItemPage = () => {
    const {request, loading} = useHttp()
    const [item, setItem] = useState(null)
    const itemId = useParams().id

    useEffect(() => {
        const getItem = async () => {
            try {
                const fetched = await Axios.get(`/api/item/${itemId}`, null)
                setItem(fetched)
            } catch (e) {}
        }
        getItem()
    }, [itemId])

    if (loading){
        return <Loader />
    }

    return(
        <>
            {!loading && item && <ItemCard item={item} />}
        </>
    )
}   