import { Button } from 'primereact/button'
import React from 'react'
import { useEffect } from 'react'
import InscripcionConvocatoriaService from '../../../services/InscripcionConvocatoriaService'
import { useState } from 'react'
import HistoricoVacantesInscritas from './HistoricoVacantesInscritas'

const VacantesInscritas = (props) => {

    const [convocatoriasInscritas, setConvocatoriasInscritas] = useState([])

    const [verVacantes, setVerVacantes] = useState(true)

    useEffect(() => {
      
        InscripcionConvocatoriaService.getConvocatoriasInscritasActivas().then(result=>{
            setConvocatoriasInscritas(result.data)
        })
    
      return () => {
        
      }
    }, [props.reloadData])
    
    const setDataObjet = (el)=>{
        let dataObjet = el
        let fechaI = new Date(dataObjet.fecha_inscripcion)
        dataObjet.fechaI = `${fechaI.getFullYear()}/${fechaI.getMonth()+1}/${fechaI.getDate()}`

        if (dataObjet.convocatorium.ciudad.nombre_ciudad) {
            dataObjet.ciudad = dataObjet.convocatorium.ciudad.nombre_ciudad
        }
        
        if (dataObjet.convocatorium.centro_costo.nombre_centro_costo) {
            dataObjet.centro_costo = dataObjet.convocatorium.centro_costo.nombre_centro_costo
        }
        
        if (dataObjet.convocatorium.titulo) {
            dataObjet.titulo = dataObjet.convocatorium.titulo
        }
        
        if (dataObjet.convocatorium.descripcion) {
            dataObjet.descripcion = dataObjet.convocatorium.descripcion
        }

        return dataObjet
    }

    const verDetallesConvocatoria = (el) => {
        let dataObjet = setDataObjet(el)
        props.setDataConvocatoriaInscrita(dataObjet)
        props.setVisibilidadModalConvocatoriaInscrita(true)
    }

    const cancelarInscripcionConvocatoria = (e,el) =>{
        console.log(el)
        props.confirmCancelarInscripcion(e, el.id_empleado_fk, el.id_convocatoria_fk)
    }

  return (
    <div>

        <div className='mb-6 grid'>
            <h5 className='col-9'>{verVacantes?"Vacantes Inscritas":"Historico Inscripciones"}</h5>
            <Button onClick={()=>setVerVacantes(!verVacantes)} label={verVacantes?"Consultar Historico":"Ver Vacantes Inscritas"} className='p-button-text p-button-secondary' icon="pi pi-clock"/>
        </div>
        {verVacantes && <>
        
            {
                convocatoriasInscritas.map((el,id)=>{
                    let fechaF = new Date(el.convocatorium.fecha_finalizacion) 
                    fechaF = `${fechaF.getFullYear()}/${fechaF.getMonth()+1}/${fechaF.getDate()}`
                    return (
                        <div className="card grid p-2" key={id}>
                            <div className="col-12 sm:col-12 md:col-6 xl:col-8">
                                <h6 className='mb-1'>{el.convocatorium.titulo}</h6>
                                <p className='white-space-nowrap overflow-hidden text-overflow-ellipsis'>{el.convocatorium.descripcion}</p>
                            </div>
                            <div className="col-12 sm:col-12 md:col-6 xl:col-4 flex flex-column align-items-end justify-content-between">
                                <h6>Fecha Finalización: <b>{fechaF}</b></h6>
                                <div className='flex'>
                                    <Button icon="pi pi-eye" label='Detalles' className='p-button-text p-button-success' onClick={()=>verDetallesConvocatoria(el)}/>
                                    <Button icon="pi pi-times-circle" label='Cancelar' className='p-button-text p-button-danger' onClick={e=>cancelarInscripcionConvocatoria(e,el)}/>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
        </>}

        {!verVacantes && <>
            <HistoricoVacantesInscritas />
        </>}

    </div>
  )
}

export default VacantesInscritas