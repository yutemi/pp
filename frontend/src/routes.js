import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { ProfilePage } from "./pages/ProfilePage"
import { MainPage } from "./pages/MainPage"
import { CartPage } from "./pages/CartPage"
import { ItemPage } from "./pages/ItemPage"

export const useRoutes = isAuth => {
    if (isAuth){
        return (
            <Routes>
                <Route path="/item/:id" element={
                    <ItemPage />
                } />
                <Route path="/cart" exact element={
                    <CartPage />
                } />
                <Route path="/profile" exact element={
                    <ProfilePage />
                } />
                <Route path="/" exact element={
                    <MainPage />
                } />
            </Routes>
        )
    }

    return(
        <Routes>
            <Route path="/item/:id" element={
                    <ItemPage />
                } />
                <Route path="/cart" exact element={
                    <AuthPage />
                } />
                <Route path="/profile" exact element={
                    <AuthPage />
                } />
                <Route path="/" exact element={
                    <MainPage />
                } />
        </Routes>
    )
}