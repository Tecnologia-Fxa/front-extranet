import axios from "axios"

const API = process.env.NEXT_PUBLIC_RUTA_API + '/convocatoria'


const ConvocatoriaService = {

    getConvocatoriasDisponiblesActivas:async()=>{
        return axios.get(`${API}/get-activas`)
    },

    getConvocatoriasFuturas:async()=>{
        return axios.get(`${API}/get-inactivas-futuras`)
    },

    getConvocatoriasPasadas:async()=>{
        return axios.get(`${API}/get-inactivas-pasadas`)
    },

    createConvocatoria:async(data)=>{
        return axios.post(`${API}/create`,data)
    },

    updateConvocatoria:async(data)=>{
        return axios.put(`${API}/update`,data)
    },

    finalizarConvocatoria: async(id_convocatoria)=>{
        return axios.put(`${API}/finalizar-convocatoria?id_convocatoria=${id_convocatoria}`)
    },

    actualizarConvocatoria: async(data)=>{
        return axios.put(`${API}/update`, data)
    }

}


export default ConvocatoriaService