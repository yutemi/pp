import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from "./components/navbar"
import { Loader } from "./components/loader"
import "materialize-css"

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if (!ready){
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth
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
