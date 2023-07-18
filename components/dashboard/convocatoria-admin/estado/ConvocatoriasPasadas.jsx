import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ConvocatoriaService from '../../../../services/ConvocatoriaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ConvocatoriasPasadas = () => {


    //Constante que trae la ruta donde esta el api, en este caso para listar documentos
    const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

    const [convocatorias, setConvocatorias] = useState([]);

    const [dataConvocatoria, setDataConvocatoria] = useState({})


    useEffect(() => {
        ConvocatoriaService.getConvocatoriasPasadas().then(result =>{
            setConvocatorias(result.data)
        })
    
      return () => {
        
      }
    }, [])
    
    const fechaFinalizacion = (options) =>{
        let fecha = new Date(options.fecha_finalizacion)
        let fechaFormat = `${fecha.getFullYear()}/${fecha.getMonth()+1}/${fecha.getDate()}`
        
        return fechaFormat
    }

    const totalEmpleados = (options) =>{
        let contador = 0

        options.inscripcion_empleado_convocatoria.forEach(() => {
            contador ++
        });

        return contador
    }

    const botonesDeAccion = (options) =>{
        return (<div>
            <Button icon="pi pi-eye" className='p-button-text' onClick={()=>visualizarConvocatoria(options)}/>
        </div>)
    }

    const [visibilidadModalConvocatoria, setVisibilidadModalConvocatoria] = useState(false)

    const visualizarConvocatoria = (data) =>{
        setDataConvocatoria(data)
        setVisibilidadModalConvocatoria(true)
    }

    const convertitFecha = (fecha)=> {
        let fechaFormat = new Date(fecha) 
        return `${fechaFormat.getFullYear()}/${fechaFormat.getMonth()+1}/${fechaFormat.getDate()}`
    }

    const verHojaDeVida = (options) =>{
        let fechalimite = new Date()
        let fechafin = new Date(dataConvocatoria.fecha_finalizacion)
        fechalimite.setMonth(fechalimite.getMonth() + 2);
        return(<div>
            <Button icon="pi pi-file-pdf" className='p-button-text' disabled={(fechafin<fechalimite?false:true)} onClick={()=>window.open(`${APIFILE}/${options.src_hoja_de_vida}`)}/>
        </div>)
    }

  return (
    <div>
        <DataTable value={convocatorias} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <Column field="titulo" header="Titulo" style={{ width: '15%' }}></Column>
            <Column field="fecha_finalizacion" body={fechaFinalizacion} header="Fecha Finalización" style={{ width: '15%' }}></Column>
            <Column field="centro_costo.nombre_centro_costo" header="Centro Costo" style={{ width: '15%' }}></Column>
            <Column field="ciudad.nombre_ciudad" header="Ciudad" style={{ width: '15%' }}></Column>
            <Column field="inscripcion_empleado_convocatoria" body={totalEmpleados} header="Total Empleados" style={{ width: '15%' }}></Column>
            <Column field="acciones" body={botonesDeAccion} header="Acciones" style={{ width: '15%' }}></Column>
        </DataTable>


        <Dialog header={()=><p className='text-sm'>Detalles Convocatoria</p>} visible={visibilidadModalConvocatoria} onHide={()=>setVisibilidadModalConvocatoria(false)} style={{ width: '75vw' }} breakpoints={{ '960px': '95vw', '641px': '100vw' }}>
            <div className="grid w-full">
                <h5 className='xl:col-8 col-7 m-0'>{dataConvocatoria.titulo}</h5>
            </div>
            <p className="m-0 wl-full h-auto">{dataConvocatoria.descripcion}</p>
            <div className="grid mt-4">
                <div className='col-6'>
                <p>Ciudad: {dataConvocatoria.ciudad?dataConvocatoria.ciudad.nombre_ciudad:""}</p>
                </div>
                <div className='col-6'>
                <p>Centro Costo: {dataConvocatoria.centro_costo?dataConvocatoria.centro_costo.nombre_centro_costo:""}</p>
                </div>
            </div>
            <div className="grid mt-4">
                <div className='col-6'>
                <p>Fecha Inicio: {convertitFecha(dataConvocatoria.fecha_publicacion)}</p>
                </div>
                <div className='col-6'>
                <p>Fecha Finalización: {convertitFecha(dataConvocatoria.fecha_finalizacion)}</p>
                </div>
            </div>

            <DataTable value={dataConvocatoria.inscripcion_empleado_convocatoria} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <Column field="empleado.nombres" header="Nombres" style={{ width: '15%' }}></Column>
                <Column field="empleado.apellidos" header="Apellidos" style={{ width: '15%' }}></Column>
                <Column field="empleado.celular" header="Cedula" style={{ width: '15%' }}></Column>
                <Column field="empleado.cargo.nombre_cargo" header="Cargo" style={{ width: '15%' }}></Column>
                <Column field="empleado.celular" header="Celular" style={{ width: '15%' }}></Column>
                <Column field="acciones" body={verHojaDeVida} header="Hoja De Vida" style={{ width: '15%' }}></Column>
            </DataTable>

        </Dialog>

    </div>
  )
}

export default ConvocatoriasPasadas