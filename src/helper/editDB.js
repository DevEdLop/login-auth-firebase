import { db } from "../firebase";
import { doc, updateDoc } from 'firebase/firestore';

const edicDocsDatabase = async (id, search = {}, coleccion = 'busquedas') => {
    console.log(search);
    console.log("AQUI ESTAMOS", coleccion);

    const busquedaDB = doc(db, coleccion, id);
    const resul = await updateDoc(busquedaDB, search);

    return resul.id
}

export default edicDocsDatabase