import { createContext } from "react"

function a() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: a,
    logout: a,
    isAuth: false
})
