import React, {useEffect, useState} from "react"
import { useHttp } from "../hooks/http.hook"


export const AddItem = () => {
    const [form, setForm] = useState({
        name: "", price: "", desc: "", imageurl: ""
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="row">
            <div className=".col.s6.offset-s3">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">добавить товар</span>
                        <div className="input">
                            <input 
                                placeholder="name"
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={changeHandler}
                            />
                            <label htmlFor="name">название</label>
                        </div>
                        <div className="input">
                            <input 
                                placeholder="price"
                                id="price"
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={changeHandler}
                            />
                            <label htmlFor="price">цена</label>
                        </div>
                        <div className="input">
                            <input 
                                placeholder="desc"
                                id="desc"
                                type="text"
                                name="desc"
                                value={form.desc}
                                onChange={changeHandler}
                            />
                            <label htmlFor="desc">описание</label>
                        </div>
                        <div className="input">
                            <input 
                                placeholder="url"
                                id="imageurl"
                                type="text"
                                name="imageurl"
                                value={form.imageurl}
                                onChange={changeHandler}
                            />
                            <label htmlFor="imageurl">ссылка на изображение</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}