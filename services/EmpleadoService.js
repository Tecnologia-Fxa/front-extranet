import axios from "axios";

const API = process.env.NEXT_PUBLIC_RUTA_API + '/empleado'

export class EmpleadoService {

    getEmpleadosDash(){
        return axios.get(`${API}/nuevos-empleados`)
    }

    getDatosCardsDash(){
        return axios.get(`${API}/datos-cartas`)
    }

    getPorcentajeEmpleado(){
        return axios.get(`${API}/porcentaje-empleados`)
    }

    getEmpleados(){
        return axios.get(API)
    }
    
    getEmpleadosInactivos(){
        return axios.get(`${API}/inactivos`)
    }
    
    getEmpleado(id){
        return axios.get(`${API}/${id}`)
    }

    getInfoCertificado(){
        return axios.get(`${API}/default/certificado-lab`)
    }

    getDatosEmpDocs(id){
        return axios.get(`${API}/default/data-emp-docs/${id}`)
    }

    genReporte(data){
        return axios.post(`${API}/generar-reporte`,data)
    }

    updateFechaCertificado(id){
        return axios.put(`${API}/certificado-lab-new-date/${id}`)
    }

    updateEmpleado(id, data){
        return axios.put(`${API}/${id}`, data)
    }

    createEmpleado(data){
        return axios.post(API, data)
    }

    changeState(id, action){
        return axios.put(`${API}/${action}/${id}`)
    }

    getEmpleadosPermisos(){
        return axios.get(`${API}/permisos`)
    }

    updateRol(idUsu,idRol){
        return axios.put(`${API}/cambio-rol/${idUsu}`, {idRol})
    }

    getInfoPerfil(idUsu){
        return axios.get(`${API}/info-perfil/${idUsu}`)
    }

    getRouteImgPerfil(){
        return axios.get(`${API}/default/obtener-img-perfil`)
    }

    cargueMasivo(data){
        return axios.post(`${API}/cargue-masivo`, data)
    }
}