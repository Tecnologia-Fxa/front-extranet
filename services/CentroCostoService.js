import axios from "axios";

const API = process.env.NEXT_PUBLIC_RUTA_API + '/centro-costo'

class CentroCostoService {

    getAll(){
        return axios.get(`${API}`)
    }

    getTableData(){
        return axios.get(`${API}/table-data`)
    }

    updateCentroCosto(id,data){
        return axios.put(`${API}/${id}`,data)
    }

    createCentroCosto(data){
        return axios.post(`${API}`,data)
    }

    deleteCentroCosto(id){
        return axios.delete(`${API}/${id}`)
    }

}

export default CentroCostoService