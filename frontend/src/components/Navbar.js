import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate("/")
    }

    return (
    <nav>
        <div className="nav-wrapper" style={{padding: "0 2rem"}}>
            <a href="/" className="brand-logo" style={{position: "left"}}>bebr</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {auth.isAuth ? (
                    <>
                    <li>
                        <NavLink to="/profile">профиль</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">корзина</NavLink>
                    </li>
                    <li>
                        <a href="/" onClick={logoutHandler}>
                            logout
                        </a>
                    </li>
                    </>
                ) : (
                    <li>
                        <NavLink to="/login">login</NavLink>
                    </li>
                )}   
            </ul>
        </div>
    </nav>
    )
}

