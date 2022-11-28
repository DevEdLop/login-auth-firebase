import React from 'react';

export default function Dato({ registro, delete: d }) {
  const { docID, nombre, descripcion, apellido, genero, edad, universidad, direccion } = registro;
  const borrar = () => {
    d(docID);
  };

  return (

    <tr>
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>{genero}</td>
      <td>{edad}</td>
      <td>{universidad}</td>
      <td>{direccion}</td>
      <td>{descripcion}</td>
      <td><button onClick={borrar} className='btn btn-danger'>Eliminar</button></td>
    </tr>

  )

}
