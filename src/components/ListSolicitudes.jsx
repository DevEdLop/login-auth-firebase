import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { authContext } from '../hooks/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const ListSolicitudes = () => {

    const [solicitudes, setSolicitudes] = useState([])
    const { setAuth, setIdUser } = useContext(authContext)
    const navigate = useNavigate();



    const eliminar = async (id) => {
        try {
            await deleteDoc(doc(db, 'solicitud', id))
        } catch (error) {
            console.log(error)
        }
    };

    const obtenerDatos = async () => {
        try {
            onSnapshot(collection(db, "solicitud"), (query) => {
                setSolicitudes(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
        } catch (error) {
            console.log(error)
        }
    };
    const cerrarSesion = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Estas apunto de salir",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                auth.signOut().then(() => {
                    navigate('/')
                    setAuth(false)

                })
            }
        })

    }

    useEffect(() => {
        obtenerDatos()
    }, [])

    return (
        <>
            <div className='cierre'>
                <button onClick={cerrarSesion} className="btn-cierre ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                    </svg>
                    Cerrar Sesion</button>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Categoria Principal</th>
                        <th>Tipo de servicio</th>
                        <th>Ubicacion</th>
                        <th>Descripcion</th>
                        <th>Fecha</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.map((solicitud) => {
                        console.log('baseDB', solicitud)
                        return (
                            <tr key={solicitud.id}>
                                <td>{solicitud.mainCategory}</td>
                                <td>{solicitud.serviceType}</td>
                                <td>{solicitud.ubication}</td>
                                <td>{solicitud.description}</td>
                                <td>{solicitud.date}</td>
                                <td>
                                    <div className='d-flex justify-content-evenly'>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => eliminar(solicitud.id)}
                                        >
                                            Borrar
                                        </button>
                                        <Link to={'/inicio'}>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => setIdUser(solicitudes)}
                                            >
                                                Editar
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ListSolicitudes