import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { AuthPage } from "./pages/AuthPage"
import { ProfilePage } from "./pages/ProfilePage"
import { MainPage } from "./pages/MainPage"

export const useRoutes = isAuth => {
    if (isAuth){
        return (
            <Routes>
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
            <Route path="/" exact element={
                <MainPage />
            }>
            </Route>
            <Route path="/auth" exact element={
                <AuthPage />
            } />
            <Route path="/" element={<Navigate replace to="/" />} />
        </Routes>
    )
}