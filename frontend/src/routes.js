import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { ProfilePage } from "./pages/ProfilePage"
import { MainPage } from "./pages/MainPage"
import { CartPage } from "./pages/CartPage"
import { OrdersPage } from "./pages/OrdersPage"

export const useRoutes = (isAuth, isStaff) => {
    if (isAuth){
        return (
            <Routes>
                <Route path="/cart" element={<CartPage /> } />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/order/all"
                    element={<OrdersPage />}
                />
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<MainPage />} />
            
        </Routes>
    )
}
