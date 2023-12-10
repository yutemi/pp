import React, {useContext, useState} from "react"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState("")
    const {request} = useHttp()

    const pressHandler = async event => {
        if (event.onBeforeInput){
            try {
                const data = await request("/api/link/generate", "POST", {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
            } catch (e) {
                
            }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
                <div className="input">
                    <input
                        placeholder="link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onBeforeInput={pressHandler}
                    />
                    <label htmlFor="email">link</label>
                </div>
            </div>
        </div>
)}