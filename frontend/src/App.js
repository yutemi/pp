import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from "./components/Navbar"
import { Loader } from "./components/Loader"
import "materialize-css"

function App() {
    const {token, login, logout, userId, ready, role} = useAuth()
    const isAuth = !!token
    const isStaff = ((role !== "USER" && role !== null) ? true : false)
    const routes = useRoutes(isAuth, isStaff)

    if (!ready){
        return <Loader />
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth, isStaff
        }}>
            <Router>
                {<Navbar />}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App
