import axios from "axios";

const API = process.env.REACT_APP_API + '/jefe-directo'

class JefeDirectoService {

    getTableData(){
        return axios.get(`${API}/table-data`)
    }

    getEmp(){
        return axios.get(`${API}/empleados`)
    }

    newJefe(data){
        return axios.post(`${API}/new-jefe`,data)
    }

    deleteJefe(data){
        return axios.post(`${API}/delete-jefe`,data)
    }

}

export default JefeDirectoService