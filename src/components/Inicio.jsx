import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from '../firebase';
import axios from 'axios';
export default function Inicio() {
  const [form, setForm] = useState(
    {
      nombre: '',
      apellido: '',
      genero: 'masculino',
      edad: 0,
      universidad: '',
      direccion: '',
      descripcion: '',
      userEmail: auth.currentUser?.email ?? '',
      img: ''
    }
  )
  const [imagenes, setImagenes] = useState([])

  const navigate = useNavigate();

  //autenticacion de logeo
  useEffect(() => {
    if (auth.currentUser) {
      obtenerImagenes()
    } else {
      navigate('/')
    }
  }, [navigate])


  const validarDatos = () => {
    return [
      form.nombre.length === 0 ? 'el nombre es obligatorio' : '',
      form.apellido.length === 0 ? 'el apellido es obligatorio' : '',
      form.edad <= 0 ? 'la edad debe ser mayor a 0 ' : '',
      form.universidad.length === 0 ? 'la universidad es obligatoria' : '',
      form.direccion.length === 0 ? 'la direccion es obligatoria' : ''
    ].filter((value) => value !== '')
  }

  const guardar = () => {
    const validacion = validarDatos()
    if (validacion.length === 0){
      enviarDatos();
    }else{
      console.log(validacion)
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `<ul>
         ${validacion.map((val)=> `<li>${val}</li>`)}
          </ul>`.replaceAll(',',''),
        showConfirmButton: false,
        timer: 1200
      })
    }
  }
  const obtenerImagenes = async () => {
    try {
      const data = await axios.get('https://picsum.photos/v2/list')
      setForm({ ...form, img: randomImg(data.data) })
      setImagenes(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const randomImg = (array) => {
    const random = Math.floor(Math.random() * (array.length - 1 - 0) + 0)
    return array[random].download_url
  }

  const change = () => {
    setForm({ ...form, img: randomImg(imagenes) })
  }

  const enviarDatos = async () => {
    try {
      await db.collection('registros').add(form)
      messegGood('registro guardado');
      limpiar()
    } catch (error) {
      console.log(error)
      messeg('no se logro guardar el registro')
    }
  }

  const limpiar = () => {
    setForm({
      nombre: '',
      apellido: '',
      genero: 'masculino',
      edad: 0,
      universidad: '',
      direccion: '',
      descripcion: '',
      userEmail: auth.currentUser?.email ?? '',
      img: randomImg(imagenes)
    })
  }
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
        })
      }
    })

  }
  const messegGood = (dato) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: dato + "!",
      showConfirmButton: false,
      timer: 700
    })
  }

  const messeg = (dato) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: dato,
      showConfirmButton: false,
      timer: 700
    })
  }


  return (
    <section className="text-center">
      <div className='cierre'>
        <button onClick={cerrarSesion} className="btn-cierre"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
          <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
        </svg></button>

      </div>
      <div className="p-5 bg-image fondo"></div>

      
      <div className=" inicio card mx-4 mx-md-5 shadow-5-strong">
        <div className="card-body py-5 px-md-5">
          <div className='col-lg-12 consultar'>
            <Link to="/peticiones" className="btn btn-outline-info" ><b>Consultar</b></Link>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">

              <h2 className="fw-bold mb-5">Crear Registro</h2>
              <form >
                <div className="form-outline mb-4">
                  <img src={form.img} onClick={change} width={200} height={200} className="img-change" alt="Cinque Terre"></img>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" >NOMBRE</label>
                  <input value={form.nombre} id='nombre' type="text" className="form-control" onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" >APELLIDO</label>
                  <input value={form.apellido} type="text" className="form-control" onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">GENERO</label>
                  <select id='Genero' value={form.genero} className='form-select' aria-label='Defoult select example' onChange={(e) => setForm({ ...form, genero: e.target.value })}>
                    <option id='hombre' value="masculino">MASCULINO</option>
                    <option value="femenino">FEMENINO</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" >EDAD</label>
                  <input type="number" value={form.edad} className="form-control" onChange={(e) => setForm({ ...form, edad: e.target.value })} />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" >UNIVERSIDAD</label>
                  <input type="text" value={form.universidad} className="form-control" onChange={(e) => setForm({ ...form, universidad: e.target.value })} />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" >DIRECCION</label>
                  <input type="text" value={form.direccion} className="form-control" onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
                </div>


                <div className="form mb-4">
                  <textarea id="descripcion" className="form-label" value={form.descripcion} rows="5" cols="80" onChange={(e) => setForm({ ...form, descripcion: e.target.value })} ></textarea>
                </div>





              </form>
              <button onClick={limpiar} className="btn btn-danger btn-block mb-4 cancelar">
                Cancelar
              </button>
              <button onClick={guardar} className="btn btn-primary btn-block mb-4">
                Enviar
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
