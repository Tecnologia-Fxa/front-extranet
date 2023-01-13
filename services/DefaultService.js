import axios from "axios";

const DefaultService=(rute)=>{
    
    const API = process.env.NEXT_PUBLIC_RUTA_API + `/${rute}`

    return class Service {

        getAll(){
            return axios.get(`${API}`)
        }
    
        getTableData(){
            return axios.get(`${API}/default/table-data`)
        }
    
        update(id,data){
            return axios.put(`${API}/${id}`, data)
        }
    
        create(data){
            return axios.post(`${API}`, data)
        } 
    
        delete(id){
            return axios.delete(`${API}/${id}`)
        }
    }
    

}

export default DefaultService