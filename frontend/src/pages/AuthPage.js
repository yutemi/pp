import React, {useEffect, useState} from "react"
import { useHttp } from "../hooks/http.hook"
import { useMsg } from "../hooks/msg.hook"


export const AuthPage = () => {
    const {loading, err, request, clearErr} = useHttp()
    const msg = useMsg()

    const [form, setForm] = useState({
        email: "", pass: ""
    })

    useEffect(() => {
        msg(err)
        clearErr()
    }, [err, msg, clearErr])

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
            msg(data.message)
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
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">email</label>
                        </div>
                        <div className="input">
                            <input 
                                placeholder="pass"
                                id="pass"
                                type="password"
                                name="pass"
                                onChange={changeHandler}
                            />
                            <label htmlFor="pass">pass</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            disabled={loading}
                            onClick={loginHandler}  
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