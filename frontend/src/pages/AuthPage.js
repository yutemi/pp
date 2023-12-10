import React, {useContext, useEffect, useState} from "react"
import { useHttp } from "../hooks/http.hook"
import { useMsg } from "../hooks/msg.hook"
import { AuthContext } from "../context/AuthContext"


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const msg = useMsg()
    const {loading, err, request, clearErr} = useHttp()
    const [form, setForm] = useState({
        email: "", passw: ""
    })


    useEffect(() => {
        msg(err)
        clearErr()
    }, [err, msg, clearErr])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const regHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            msg(data.message)
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
            
        }
    }

    return (
        <div className="row">
            <div className=".col.s6.offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">авторизация</span>
                        <div className="input">
                            <input 
                                placeholder="email"
                                id="email"
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">email</label>
                        </div>
                        <div className="input">
                            <input 
                                placeholder="passw"
                                id="passw"
                                type="password"
                                name="passw"
                                value={form.passw}
                                onChange={changeHandler}
                            />
                            <label htmlFor="passw">password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            войти
                        </button>
                        <button 
                            className="btn yellow darken-4"
                            onClick={regHandler}
                            disabled={loading}
                        >
                            регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}