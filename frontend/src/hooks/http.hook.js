import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const request = useCallback( async (url, method = "GET", body=null, headers={}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok){
                throw new Error(data.message || 'err')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setErr(e.message)
            throw e
        }
    }, [])

    const clearErr = useCallback(() => setErr(null), [])

    return {loading, request, err, clearErr}
}