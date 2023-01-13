import axios from "axios";

const API = process.env.NEXT_PUBLIC_RUTA_API + '/empresa'

class EmpresaService {

    getAll(){
        return axios.get(`${API}`)
    }

    getTableData(){
        return axios.get(`${API}/table-data`)
    }

    createEmpresa(data){
        return axios.post(`${API}`, data)
    }

    updateEmpresa(id,data){
        return axios.put(`${API}/${id}`, data)
    }

    deleteEmpresa(id){
        return axios.delete(`${API}/${id}`)
    }

}

export default EmpresaService