import React from 'react'
import { collection,addDoc} from 'firebase/firestore/lite';
import { db, auth } from '../firebase';
import createDocsDatabase from '../helper/saveDB';

const useSave = (form,colecction) => {
    const [loading, setloading] = useState(true);
    const [idDocumentos, setIdDocument] = useState(true);
    createDocsDatabase(form,colecction)
        .then((res)=>{
            setIdDocument(res)
            setloading(false)
        })
   return {
    loading
   }
}

export default useSave
