import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { AuthPage } from "./pages/AuthPage"
import { ProfilePage } from "./pages/ProfilePage"
import { MainPage } from "./pages/MainPage"
import { CartPage } from "./pages/CartPage"
import { ItemPage } from "./pages/ItemPage"
import { AddItem } from "./pages/AddItem"

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
                <Route path="/links" exact element={
                    <LinksPage />
                } />
                <Route path="/profile" exact element={
                    <ProfilePage />
                } />
                <Route path="/create" exact element={
                    <CreatePage />
                } />
                <Route path="/detail/:id" element={
                    <DetailPage />
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
            <Route path="/" exact element={
                <MainPage />
            } />
            <Route path="/links" exact element={
                <AuthPage />
            } />
            <Route path="/profile" exact element={
                <AuthPage />
            } />
            <Route path="/api/item/add" element={
                <AddItem />
            } />
        </Routes>
    )
}