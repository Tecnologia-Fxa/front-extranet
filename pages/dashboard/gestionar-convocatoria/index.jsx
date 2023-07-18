import { Button } from 'primereact/button'
import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { useEffect } from 'react';
import { Column } from 'primereact/column';
import ConvocatoriaService from '../../../services/ConvocatoriaService';
import { Dialog } from 'primereact/dialog';
import NewConvoactoria from '../../../components/dashboard/convocatoria-admin/NewConvoactoria';
import FormikConvocatorias from '../../../helpers/FormikConvocatorias'
import { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import ConvocatoriasGeneral from '../../../components/dashboard/convocatoria-admin/ConvocatoriasGeneral';

const GestionarConvocatoria = () => {

    //Constante que trae la ruta donde esta el api, en este caso para listar documentos
    const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

    const [convocatorias, setConvocatorias] = useState([]);
    const [dataConvocatoria, setDataConvocatoria] = useState([])

    //Gancho para recargar la informacion del componente
    const [reloadPage, setReloadPage] = useState(0)

    //Gancho para indicar que un formulario se esta actualizando
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        ConvocatoriaService.getConvocatoriasDisponiblesActivas().then(result=>setConvocatorias(result.data))
    }, [reloadPage]);

    const fechaPublicacion = (options) =>{
        let fecha = new Date(options.fecha_publicacion)
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
            <Button icon="pi pi-trash" className='p-button-text p-button-danger' onClick={e=>confirmCancelarInscripcion(e, options.id_convocatoria)}/>
        </div>)
    }

    const [visibilidadModalConvocatoria, setVisibilidadModalConvocatoria] = useState(false)
    const [visibilidadModalNewConvocatoriaInscrita, setVisibilidadModalNewConvocatoriaInscrita] = useState(false)

    const verHojaDeVida = (options) =>{
        return(<div>
            <Button icon="pi pi-file-pdf" className='p-button-text' onClick={()=>window.open(`${APIFILE}/${options.src_hoja_de_vida}`)}/>
        </div>)
    }

    const visualizarConvocatoria = (data) =>{
        setDataConvocatoria(data)
        setVisibilidadModalConvocatoria(true)
    }

    const convertitFecha = (fecha)=> {
        let fechaFormat = new Date(fecha) 
        return `${fechaFormat.getFullYear()}/${fechaFormat.getMonth()+1}/${fechaFormat.getDate()}`
    }

    const openNewConvocatoria = () =>{
        setVisibilidadModalNewConvocatoriaInscrita(true)
        convocatoriasFormik.resetForm()
        setIsUpdate(false)
    }

    const FooterNewConvocatoriaInscrita = () =>{
        return(<div>
            <Button label='Cancelar' className='p-button-text p-button-secondary' onClick={()=>setVisibilidadModalNewConvocatoriaInscrita(false)}/>
            <Button label={isUpdate?"Actualizar Convocatoria":"Crear nuevaConvocatoria"} className='p-button-text p-button-raised' type='submit' onClick={convocatoriasFormik.handleSubmit}/>
        </div>)
    }

    
    
    //Seccion de alerta emergente
    const [toatsComponent, setToatsComponent] = useState({});
    const toast = useRef(null);
    
    useEffect(()=>{
        if(toatsComponent.severity){
            toast.current.show(toatsComponent);
        }
    },[toatsComponent])
    
    //Funcion para ocultar la ventana emergente de nueva convocatoria
    const hideModal = () =>{
        setVisibilidadModalNewConvocatoriaInscrita(false)
        convocatoriasFormik.resetForm()
    }

    const reloadPageFun = ()=>setReloadPage(reloadPage+1)
    const formikConvocatorias = new FormikConvocatorias()
    const convocatoriasFormik = formikConvocatorias.formik({setToatsComponent, hideModal, reloadPage:reloadPageFun, isUpdate:isUpdate})

    //Funcion para finalizar una convocatoria
    const finalizarConvocatoria = (id_convocatoria) =>{
        ConvocatoriaService.finalizarConvocatoria(id_convocatoria).then(response=>{
            setTimeout(()=>{
                setReloadPage(reloadPage+1)
                toast.current.show({ severity: 'warn', summary: 'Todo Bien', detail: response.data.message, life: 3000 })
            }, 800)
        })
    }

    //Funcion de confirmación
    const confirmCancelarInscripcion = (event, id_convocatoria) => {
        confirmPopup({
            target: event.currentTarget,
            message: '¿Está seguro de finalizar la convocatoria?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel:"¡Seguro!",
            accept:()=>finalizarConvocatoria(id_convocatoria)
        });
    };


    //Vista de convocatorias
    const [vistaConvocatorias, setVistaConvocatorias] = useState(true)


    //Header Modal para editar
    const HeaderConvocatoria = ()=>{
        return (<div>
        <Button className='p-button-text p-button-raised' label='Editar Convocatoria' onClick={OpenEditConvocatoria}/>
        </div>)
    }




    const OpenEditConvocatoria = () =>{
        setIsUpdate(true)
        console.log(dataConvocatoria)
        convocatoriasFormik.setValues({
            id_convocatoria:dataConvocatoria.id_convocatoria,
            titulo:dataConvocatoria.titulo,
            descripcion:dataConvocatoria.descripcion,
            id_ciudad_fk: dataConvocatoria.id_ciudad_fk,
            id_centro_costo_fk:dataConvocatoria.id_centro_costo_fk,
            fecha_publicacion:new Date(dataConvocatoria.fecha_publicacion),
            fecha_finalizacion:new Date(dataConvocatoria.fecha_finalizacion)
        })
        setVisibilidadModalNewConvocatoriaInscrita(true)
        setVisibilidadModalConvocatoria(false)
    }
  return (
    <div className='card'>

        {vistaConvocatorias && <>
            <Button icon="pi pi-plus" className='p-button-rounded' onClick={openNewConvocatoria}/>

            <div className='flex align-items-center	justify-content-between my-4'>
                <h2>Convocatorias Activas <i className='pi pi-arrow-circle-right cursor-pointer' style={{fontSize:"1.5rem"}} onClick={()=>setVistaConvocatorias(false)}/></h2>
            </div>

            
        <DataTable value={convocatorias} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <Column field="titulo" header="Titulo" style={{ width: '15%' }}></Column>
            <Column field="fecha_publicacion" body={fechaPublicacion} header="Fecha Publicación" style={{ width: '15%' }}></Column>
            <Column field="centro_costo.nombre_centro_costo" header="Centro Costo" style={{ width: '15%' }}></Column>
            <Column field="ciudad.nombre_ciudad" header="Ciudad" style={{ width: '15%' }}></Column>
            <Column field="inscripcion_empleado_convocatoria" body={totalEmpleados} header="Total Empleados" style={{ width: '15%' }}></Column>
            <Column field="acciones" body={botonesDeAccion} header="Acciones" style={{ width: '15%' }}></Column>
        </DataTable>

            <Dialog header={HeaderConvocatoria}  visible={visibilidadModalConvocatoria} onHide={()=>setVisibilidadModalConvocatoria(false)} style={{ width: '75vw' }} breakpoints={{ '960px': '95vw', '641px': '100vw' }}>
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

                <DataTable value={dataConvocatoria.inscripcion_empleado_convocatoria} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
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

            <Dialog header={()=><p className='text-sm'>{isUpdate?"Actualizar":"Crear nueva"} Convocatoria</p>} visible={visibilidadModalNewConvocatoriaInscrita} onHide={()=>setVisibilidadModalNewConvocatoriaInscrita(false)} style={{ width: '40vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} footer={FooterNewConvocatoriaInscrita}>
                <NewConvoactoria convocatoriasFormik={convocatoriasFormik} isUpdate={isUpdate}/>
            </Dialog>
        
        </>}

        {!vistaConvocatorias && <ConvocatoriasGeneral setVistaConvocatorias={setVistaConvocatorias}/>}

        <Toast ref={toast} position="bottom-right"/>
        <ConfirmPopup />
    </div>
  )
}

export default GestionarConvocatoria