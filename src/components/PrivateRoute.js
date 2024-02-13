import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import Layout from "../layouts/Layout"
import { useAuth } from "../context/AuthContext"


export default function PrivateRoute() {
  const { token, user } = useAuth()
  return token ? (user ? <Layout><Outlet/></Layout> : <span>loading</span>) : <Navigate to="/login" />
}