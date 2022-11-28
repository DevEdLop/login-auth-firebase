import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db, auth } from '../firebase';
import { authContext } from "../hooks/AuthProvider";



const FormSolicitud = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(authContext)

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/')
        }
    }, [navigate])


    const servicesType = [
        ["Baños", "Cielo Raso", "Electrico", "Pared", "Puerta"],
        ["Aire acondicionado", "Archivador", "Puesto de trabajo", "Silla"],
        ["Aseo", "Transporte", "Vigilancia"],
    ];
    const [servicesTypeSelected, setServicesTypeSelected] = useState([]);
    const [solicitud, setSolicitud] = useState({
        mainCategory: "MANTENIMIENTO INMUEBLES",
        serviceType: "",
        description: "",
        ubication: "",
        date: "",
    });
    const mainCategories = [
        "MANTENIMIENTO INMUEBLES",
        "MANTENIMIENTO MUEBLES",
        "SERVICIOS",
    ];
    useEffect(() => {
        switch (solicitud.mainCategory) {
            case "MANTENIMIENTO INMUEBLES":
                setServicesTypeSelected(servicesType[0]);
                break;
            case "MANTENIMIENTO MUEBLES":
                setServicesTypeSelected(servicesType[1]);
                break;
            case "SERVICIOS":
                setServicesTypeSelected(servicesType[2]);
                break;

            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [solicitud.mainCategory]);

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


    const guardarSolicitud = async () => {

        try {

            const dbFire = db.firestore()


            await dbFire.collection('registros').add(solicitud)
            console.log(solicitud);
            Swal.fire(
                'HECHO!',
                'Su solicitud ha sido enviada',
                'success'
            )




        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='cierre'>
                <button onClick={cerrarSesion} className="btn-cierre"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
                Cerrar Sesion</button>

            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    top: "10px",
                }}
            >
                <form style={{ width: "600px" }}>
                    <h3 style={{ fontWeight: "bold" }}> Hacer Solicitud</h3>
                    <div className="mb3">
                        <label for="exampleInputEmail1" className="form-label">
                            Categoria Principal
                        </label>
                        <select id="exampleInputEmail1" class="form-select" value={solicitud.mainCategory} onChange={(e) => setSolicitud({ ...solicitud, mainCategory: e.target.value })}>
                            {mainCategories.map((categoria) => <option>{categoria}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail2" className="form-label">
                            Tipo de Servicio
                        </label>
                        <select id="exampleInputEmail2" class="form-select" value={solicitud.serviceType} onChange={(e) => setSolicitud({ ...solicitud, serviceType: e.target.value })}>
                            {servicesTypeSelected.map((servicio) => <option>{servicio}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="area" className="form-label">
                            Descripcion
                        </label>
                        <textarea className="form-control" id="area" onChange={(e) => setSolicitud({ ...solicitud, description: e.target.value })}></textarea>
                    </div>
                    <div className="mb-3">
                        <label for="ubi" className="form-label">
                            Ubicacion
                        </label>
                        <input type="text" className="form-control" id="ubi" onChange={(e) => setSolicitud({ ...solicitud, ubication: e.target.value })}></input>
                    </div>
                    <div className="mb-3">
                        <label for="date" className="form-label">
                            Fecha de solicitud
                        </label>
                        <input type="date" className="form-control" id="date" onChange={(e) => setSolicitud({ ...solicitud, date: e.target.value })}></input>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ width: "100%", margin: "5px" }}
                        onClick={guardarSolicitud}
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormSolicitud;
