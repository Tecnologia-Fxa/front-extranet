import axios from "axios";

const API = process.env.NEXT_PUBLIC_RUTA_API + '/documentos-faltantes'

class DocumentosFaltantesService {

    create(data){
        return axios.post(`${API}`,data)
    }

    getByIdEmp(id){
        return axios.get(`${API}/${id}`)
    }

    deleteDoc(data){
        return axios.post(`${API}/delete-doc`,data)
    }

}

export default DocumentosFaltantesService