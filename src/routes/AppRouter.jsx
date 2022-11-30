import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import FormSolicitud from '../components/InicioMuebles'
import ListSolicitudes from '../components/ListSolicitudes'
import Login from '../components/Login'
import NavBar from '../components/Navbar'
import Register from '../components/Register'
import { authContext } from '../hooks/AuthProvider'

const AppRouter = () => {

    const { auth } = useContext(authContext)

    console.log('hola', auth)
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/inicio" element={auth ? <FormSolicitud /> : <Login />} />
                <Route path="/solicitudes" element={auth ? <ListSolicitudes/> : <Login />} />
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}

export default AppRouter
