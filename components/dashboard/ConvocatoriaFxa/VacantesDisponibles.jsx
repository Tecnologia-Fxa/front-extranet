import { Button } from 'primereact/button'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import InscripcionConvocatoriaService from '../../../services/InscripcionConvocatoriaService'

const VacantesDisponibles = (props) => {

    const [convocatoriasActivas, setConvocatoriasActivas] = useState([])

    

    useEffect(() => {
        
        InscripcionConvocatoriaService.getConvocatoriasDisponiblesActivas().then(result=>{
            setConvocatoriasActivas(result.data)
        })
    
      return () => {
        
      }
    }, [props.reloadData])

    const AplicarAConvocatoria = (el) => {
        let dataObjet = el
        let fechaF = new Date(dataObjet.fecha_finalizacion)
        dataObjet.fechaF = `${fechaF.getFullYear()}/${fechaF.getMonth()+1}/${fechaF.getDate()}`

        if (dataObjet.ciudad.nombre_ciudad) {
            dataObjet.ciudad = dataObjet.ciudad.nombre_ciudad
        }
        if (dataObjet.centro_costo.nombre_centro_costo) {
            dataObjet.centro_costo = dataObjet.centro_costo.nombre_centro_costo
        }
        props.setDataConvocatoriaInscripcion(dataObjet)
        props.setVisibilidadModalInscribirse(true)
    }

  return (
    <div>
        <h5 className='mb-6'>Vacantes Disponibles</h5>
        {
            convocatoriasActivas.map((el,id)=>{
                let fechaP = new Date(el.fecha_publicacion) 
                fechaP = `${fechaP.getFullYear()}/${fechaP.getMonth()+1}/${fechaP.getDate()}`
                return (
                    <div className="card grid p-2" key={id}>
                        <div className="col xl:col-8">
                            <h6 className='mb-1'>{el.titulo}</h6>
                        </div>
                        <p className='white-space-nowrap overflow-hidden text-overflow-ellipsis' >{el.descripcion}</p>
                        <div className="col xl:col-12 flex flex-column align-items-end justify-content-between">
                            <h6>Fecha Publicacion: <b>{fechaP}</b></h6>
                            <Button icon="pi pi-check-circle" label='Aplicar' className='p-button-text' onClick={()=>AplicarAConvocatoria(el)}/>
                        </div>
                    </div>
                )
            })
        }
               
    </div>
  )
}

export default VacantesDisponibles