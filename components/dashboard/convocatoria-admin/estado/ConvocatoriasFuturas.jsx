import React from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import ConvocatoriaService from '../../../../services/ConvocatoriaService';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


const ConvocatoriasFuturas = () => {

    const [convocatorias, setConvocatorias] = useState([]);

    const toast = useRef(null);

    const [visibilidadModalConvocatoria, setVisibilidadModalConvocatoria] = useState(false)

    const [dataConvocatoria, setDataConvocatoria] = useState([])
    
    const [reload, setReload] = useState(0)

    useEffect(() => {
        ConvocatoriaService.getConvocatoriasFuturas().then(result=>setConvocatorias(result.data))
    }, [reload]);

    const fechaPublicacion = (options) =>{
        let fecha = new Date(options.fecha_publicacion)
        let fechaFormat = `${fecha.getFullYear()}/${fecha.getMonth()+1}/${fecha.getDate()}`
        
        return fechaFormat
    }

    const visualizarConvocatoria = (options) =>{
        setDataConvocatoria(options)
        setVisibilidadModalConvocatoria(true)
    }

    const botonesDeAccion = (options) =>{
        return (<div>
            <Button icon="pi pi-eye" className='p-button-text' onClick={()=>visualizarConvocatoria(options)}/>
        </div>)
    }

    const convertitFecha = (fecha)=> {
        let fechaFormat = new Date(fecha) 
        return `${fechaFormat.getFullYear()}/${fechaFormat.getMonth()+1}/${fechaFormat.getDate()}`
    }

    const FooterDialog = () =>{
        return(<>
            <Button className='p-button-text p-button-secondary' label='Cerrar' onClick={()=>setVisibilidadModalConvocatoria(false)}/>
            <Button className='p-button-raised' label='Activar Ahora' onClick={activarConvocatoriaAhora}/>
        </>)
    }

    const activarConvocatoriaAhora = () =>{
        let dataConvocatoriaObject = {
            id_convocatoria:dataConvocatoria.id_convocatoria,
            titulo: dataConvocatoria.titulo,
            descripcion: dataConvocatoria.descripcion,
            fecha_publicacion: new Date(),
            fecha_finalizacion: dataConvocatoria.fecha_publicacion,
            id_centro_costo_fk: dataConvocatoria.id_centro_costo_fk,
            id_ciudad_fk: dataConvocatoria.id_ciudad_fk
        }
        ConvocatoriaService.actualizarConvocatoria(dataConvocatoriaObject).then(response=>{
            toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: response.data.message, life: 3000 })
            setReload(reload+1)
            setVisibilidadModalConvocatoria(false)
        })
    }

  return (
    <div>

        <DataTable value={convocatorias} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <Column field="titulo" header="Titulo" style={{ width: '20%' }}></Column>
            <Column field="fecha_publicacion" body={fechaPublicacion} header="Fecha Publicación" style={{ width: '25%' }}></Column>
            <Column field="centro_costo.nombre_centro_costo" header="Centro Costo" style={{ width: '25%' }}></Column>
            <Column field="ciudad.nombre_ciudad" header="Ciudad" style={{ width: '25%' }}></Column>
            <Column field="acciones" body={botonesDeAccion} header="Acciones" style={{ width: '25%' }}></Column>
        </DataTable>

        <Dialog header={()=><p className='text-sm'>Detalles Convocatoria</p>} visible={visibilidadModalConvocatoria} onHide={()=>setVisibilidadModalConvocatoria(false)} style={{ width: '50vw' }} footer={FooterDialog} breakpoints={{ '960px': '85vw', '641px': '100vw' }}>
                <div className="grid w-full">
                    <h5 className='xl:col-8 col-7 m-0'>{dataConvocatoria.titulo}</h5>
                </div>
                <p className="m-0 wl-full h-auto">{dataConvocatoria.descripcion}</p>
                <div className="grid mt-4">
                    <div className='col-6'>
                    <p>Ciudad: <b>{dataConvocatoria.ciudad?dataConvocatoria.ciudad.nombre_ciudad:""}</b></p>
                    </div>
                    <div className='col-6'>
                    <p>Centro Costo: <b>{dataConvocatoria.centro_costo?dataConvocatoria.centro_costo.nombre_centro_costo:""}</b></p>
                    </div>
                </div>
                <div className="grid mt-4">
                    <div className='col-6'>
                    <p>Fecha Inicio: <b>{convertitFecha(dataConvocatoria.fecha_publicacion)}</b></p>
                    </div>
                    <div className='col-6'>
                    <p>Fecha Finalización: <b>{convertitFecha(dataConvocatoria.fecha_finalizacion)}</b></p>
                    </div>
                </div>

            </Dialog>
            <Toast ref={toast} position="bottom-right"/>

    </div>
  )
}

export default ConvocatoriasFuturas