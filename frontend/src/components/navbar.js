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
                <li><NavLink to="/profile">profile</NavLink></li>
                <li><NavLink to="/links">links</NavLink></li>
                <li><NavLink to="/cart">cart</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>logout</a></li>
                
            </ul>
        </div>
    </nav>
    )
}

