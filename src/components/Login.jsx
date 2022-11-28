import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from '../firebase';
import { authContext } from '../hooks/AuthProvider'
import ecommerce from '../images/Celular-Ecommerce.png'


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useContext(authContext)

  useEffect(() => {
    document.addEventListener('keydown', enter, true)
  }, [])

  useEffect(() => {
    console.log(auth.currentUser)
    if (auth.currentUser) {
      navigate("/inicio");
    } else {
      navigate("/");
    }
  }, [navigate]);


  const enter = (value) => {
    if (value.key === 'Enter') {
      document.getElementById('enviar').click()
    }
  }
  const verificar = () => {
    if (email.length === 0) {
      messeg('el campo email es obligatorio')
      return
    }
    if (password.length === 0) {
      messeg('el campo password es obligatorio')
      return
    }
    if (password.length < 6) {
      messeg('la contraseña debe tener minimo 6 caracteres')
      return
    }

    Login();
  }

  const Login = React.useCallback(async () => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log(user)

      setEmail('');
      setPassword('');
      navigate('/inicio')
      setAuth(true)
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        messeg('contraseña incorrecta')
      } else if (error.code === 'auth/user-not-found') {
        messeg('usuario no registrado')
      }
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])




  const messeg = (dato) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: dato + "!",
      showConfirmButton: false,
      timer: 700
    })
  }
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={ecommerce} alt="ecommerce"/>
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">

            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <Link to="/" className="nav-link active bg-primary" ><b>Login</b></Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to="/register" className="nav-link text-primary " ><b>Register</b></Link>
              </li>
            </ul>
            <form>
              <div className="form-outline mb-4">
                <input type="email" id="correo" className="form-control form-control-lg" placeholder='Correo' onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="correo">Correo</label>
              </div>


              <div className="form-outline mb-4">
                <input type="password" id="Contraseña" className="form-control form-control-lg" placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="Contraseña">Contraseña</label>
              </div>
              <div className="d-grid gap-2">
                <button id='enviar' type='button' onClick={verificar} onKeyDown={(e) => enter(e.target.value)} className="btn btn-primary btn-block mb-4">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
