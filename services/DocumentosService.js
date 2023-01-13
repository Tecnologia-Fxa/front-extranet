import axios from "axios";

const API = process.env.NEXT_PUBLIC_RUTA_API + '/documentos'

class DocumentosService {


    getByIdEmp(id){
        return axios.get(`${API}/docs-emp/${id}`)
    }

    delete(data){
        return axios.post(`${API}/delete-doc`, data)
    }

}

export default DocumentosService