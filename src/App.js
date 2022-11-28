import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./components/Login";
import Register from "./components/Register";
import Inicio from "./components/Inicio";
import TablaPeticiones from "./components/TablaPeticiones";


function App() {
  return (
    <Router>
         <Routes>
            <Route index path="/" element={<Login></Login>}  />
            <Route path="/register" element={<Register></Register>}  />
            <Route path="/inicio" element={<Inicio></Inicio>}  />
            <Route path="/peticiones" element={<TablaPeticiones></TablaPeticiones>}  />
         </Routes>
    </Router>
         
  );
}

export default App;
