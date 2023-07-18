import React from 'react'
import InscripcionConvocatoriaService from '../../../services/InscripcionConvocatoriaService'
import { useState } from 'react'
import { useEffect } from 'react'

const HistoricoVacantesInscritas = () => {

    const [convocatoriasInscritasInactivas, setConvocatoriasInscritasInactivas] = useState([])

    useEffect(() => {
      
        InscripcionConvocatoriaService.getConvocatoriasInscritasInactivas().then(result=>{
            setConvocatoriasInscritasInactivas(result.data)
            console.log(result.data)
        })
    
      return () => {
        
      }
    }, [])

  return (
    <div className='grid'>

        {
            convocatoriasInscritasInactivas.map((el,id)=>{
                let fechaP = new Date(el.convocatorium.fecha_publicacion)
                fechaP = `${fechaP.getFullYear()}/${fechaP.getMonth()+1}/${fechaP.getDate()}`
                let fechaI = new Date(el.fecha_inscripcion)
                fechaI = `${fechaI.getFullYear()}/${fechaI.getMonth()+1}/${fechaI.getDate()}`
                return(
                    <div className='card col-12 sm:col-12 md:col-5 xl:col-3  p-5 mx-1' key={id}>
                        <h6>Fecha publicacion: {fechaP}</h6>
                        <h5>{el.convocatorium.titulo}</h5>
                        <p>{el.convocatorium.descripcion}</p>
                        <h6>Fecha inscripcion: {fechaI}</h6>
                        <p>Ciudad: {el.convocatorium.ciudad.nombre_ciudad}</p>
                        <p>Centro Costo: {el.convocatorium.centro_costo.nombre_centro_costo}</p>
                    </div>
                )
            })
        }

        
        
    </div>
  )
}

export default HistoricoVacantesInscritas