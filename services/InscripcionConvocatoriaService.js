import axios from "axios"

const API = process.env.NEXT_PUBLIC_RUTA_API + '/inscripcion-convocatoria'


const InscripcionConvocatoriaService = {

    getConvocatoriasInscritasInactivas: async()=>{
        return axios.get(`${API}/listar-inscritas-inactivas`)
    },

    cancelarInscripcion: async(id_empelado, id_convocatoria)=>{
        return axios.delete(`${API}/eliminar-inscripcion?id_empleado_fk=${id_empelado}&id_convocatoria_fk=${id_convocatoria}`)
    },

    getConvocatoriasInscritasActivas:async()=>{
        return axios.get(`${API}/listar-inscritas-activas`)
    },

    getConvocatoriasDisponiblesActivas:async()=>{
        return axios.get(`${API}/listar-disponibles-activas`)
    },

    confirmarInscripcion:async(data)=>{
        return axios.post(`${API}/inscribir`, data)
    }



}


export default InscripcionConvocatoriaService