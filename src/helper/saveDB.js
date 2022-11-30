import { db } from "../firebase";
import { collection,addDoc} from 'firebase/firestore';

const createDocsDatabase = async (search={},coleccion='busquedas') => {
    console.log(search);
    console.log("AQUI ESTAMOS",coleccion);

    const busquedasDB = collection(db, coleccion);
    const resul = await addDoc(busquedasDB,search);
  
    return resul.id
}

export default createDocsDatabase