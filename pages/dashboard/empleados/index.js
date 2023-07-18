
import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { EmpleadoService } from '../../../services/EmpleadoService';
import Usuario from './Usuario';
import FormikEmp from '../../../helpers/formikUsuario';
import NewUsuario from '../../../components/dashboard/empleados/NewUsuario';
import GenerarReporte from './generarReporte/GenerarReporte';
import Documentos from '../../../components/dashboard/empleados/Documentos';
import CredencialService from '../../../services/CredencialService';

import DataTableDemo from './DataTableDemo.module.css';
import CargarArchivo from '../../../components/dashboard/empleados/CargarArchivo';


const Empleados = () => {
    const [empleados, setEmpleados] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [loading1, setLoading1] = useState(true);

    const empleadoService = new EmpleadoService();

    const [toatsEmpelado, setToatsEmpelado] = useState({});
    const toast = useRef(null);

    useEffect(()=>{
        if(toatsEmpelado.severity){
            toast.current.show(toatsEmpelado);
        }
    },[toatsEmpelado])

    const [reload, setReload] = useState(0)

    useEffect(() => {
        empleadoService.getEmpleados().then(res => { setEmpleados(res.data); setLoading1(false) });
        initFilters1();
    }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

    const changeGetAll = () =>{
        if(pageState===true){
            empleadoService.getEmpleadosInactivos().then(res => { setEmpleados(res.data); setLoading1(false) });
            setPageState(false)
        }else{
            empleadoService.getEmpleados().then(res => { setEmpleados(res.data); setLoading1(false) });
            setPageState(true)
        }
        initFilters1();
    }

    const clearFilter1 = () => {
        initFilters1();
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nombres': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'empresa.nombre_empresa': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'lugar_trabajo.nombre_ciudad': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'centro_costo.nombre_centro_costo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'numero_identificacion': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fecha_ingreso': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue1('');
    }

    let styleDataTable = "";

    if (typeof window !== "undefined") {
        styleDataTable = localStorage.getItem("styleDataTable");
    }



    const [dataView, setDataView] = useState(false);

    const cambiarEstilo = (i) =>{
        setDataView(i)
    }

    const [pageState, setPageState] = useState(true)

    const [dialogExport, setDialogExport] = useState(false)

    const [dialogImport, setDialogImport] = useState(false)
    


    const showDialogImport = () =>{
        setDialogImport(true)
    }

    const showDialogExport = () =>{
        setDialogExport(true)
    }

    const renderHeadTable = () =>{
        return (
            <div className='grid  my-4'>
                <div className='col-10 hidden xl:block lg:block'>
                    <Button onClick={showModalNewUsu} icon="pi pi-plus" className="p-button-rounded mx-4"></Button>
                    <Button icon="pi pi-file-excel" onClick={showDialogImport} iconPos="right" label="Cargar Archivo" className="p-button-rounded p-button-outlined mx-2" />
                    <Button icon="pi pi-download" onClick={showDialogExport} iconPos="right" label="Generar Reporte" className="p-button-rounded p-button-outlined mx-2" />
                </div>
                <div className='col-8 md:col-10 block xl:hidden lg:hidden'>
                    <Button onClick={showModalNewUsu} icon="pi pi-plus" className="p-button-rounded mx-3 my-1"></Button>
                    <Button icon="pi pi-file-excel" onClick={showDialogImport} iconPos="right" className="p-button-rounded p-button-outlined mx-3 my-1" />
                    <Button icon="pi pi-download" onClick={showDialogExport} iconPos="right" className="p-button-rounded p-button-outlined mx-3 my-1" />
                </div>
                <div className='col-4 xl:col-2 lg:col-2 md:col-2'>
                    <span className="p-buttonset">
                        <Button onClick={()=>cambiarEstilo(false)} className={dataView?"p-button-outlined":""} icon="pi pi-table text-xl mx-2" />
                        <Button onClick={()=>cambiarEstilo(true)} className={dataView?"":"p-button-outlined"} icon="pi pi-list text-xl mx-2" />
                    </span>
                </div>
            </div>
        )
    }

    const renderHeader1 = () => {
        return (
            <div className=" grid">
                <div className='col-12 xl:col-7 lg:col-5 md:col-5 sm:col-4'>
                    <h4>Empleados {pageState?'Activos':'Inactivos'} <i onClick={changeGetAll} className={(pageState?'pi pi-arrow-circle-right':'pi pi-arrow-circle-left')+' text-xl mx-3 cursor-pointer'}/></h4>
                    
                </div>
                <div className='col-12 xl:col-5 lg:col-7 md:col-7 sm:col-6'>
                    <Button type="button" icon="pi pi-filter-slash" label="Borrar" className="hidden xl:inline-block lg:inline-block mb-2 p-button-outlined mx-4" onClick={clearFilter1} />
                    <Button type="button" icon="pi pi-filter-slash" className="inline-block xl:hidden lg:hidden mb-2 p-button-outlined mx-4" onClick={clearFilter1} />
                    <span className="p-input-icon-left mb-2">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar" />
                    </span>
                </div>
            </div>
        )
    }

    const [modalChangeState, setModalChangeState] = useState(false);
    const [empleadoChangeState, setEmpleadoChangeState] = useState({})

    const showModalChangeState = (data)=>{
        setEmpleadoChangeState(data)
        setModalChangeState(true)
    }

    const accionesBody = rowData =>{
        return(
            <div className='w-full flex align-items-center justify-content-center'>
                {pageState &&
                    <>
                        <Button onClick={()=>showModal(rowData.id_empleado)} icon="pi pi-eye" className="p-button-rounded p-button-outlined" />
                        <Button onClick={()=>showModalChangeState(rowData)} icon="pi pi-ban" className="p-button-rounded p-button-outlined mx-2" />
                    </>
                }
                {!pageState &&
                    <Button onClick={()=>showModalChangeState(rowData)} icon="pi pi-check-circle" className="p-button-rounded p-button-outlined mx-2" />
                }
            
            </div>
        )
    }

    const API = process.env.NEXT_PUBLIC_RUTA_API + '/img/perfil'

    const avatarTableBody = (e) =>{
        return (
            <div className='w-full flex align-items-center justify-content-center'>
                <img className='border-circle' width={50} height={50} src={e.src_fotografia?`${API}/${e.src_fotografia}`:`${API}/UsuarioDefault.webp`} alt="Imagen Perfil" />
            </div>
        )
    }

    const [modalUsuario, setModalUsuario] = useState(false);
    const [modalDocumentosUsuario, setModalDocumentosUsuario] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null)

    const showModal = (id) =>{
        setIdUsuario(id)
        setModalUsuario(true)
    }

    const showModalNewUsu = () =>{
        empleadoFormik.resetForm()
        empleadoFormik.setValues({
            nombres:'',
            apellidos:'',
            id_tipo_identificacion_fk:'',
            numero_identificacion:'',
            genero:0,
            fecha_nacimiento:'',
            correo_electronico:'',
            celular:'',
            telefono_fijo:'',
            datos:'',
            empresa:'',
            extras:'',
            fecha_ingreso:'',
            jefe_directo_fk:'',
            num_cuenta:'',
            riesgo:'',
            riesgos:'',
            direccion:'',
            contacto_emergencia:'',
            tel_contacto_emergencia:''
        })
        setNewUsuDialog(true)
    }

    const [ modalChangePass, setModalChangePass] = useState(false)

    const showModalChangePass = () =>{
        setModalChangePass(true)
    }

    const hideModal = () =>{
        setModalUsuario(false)
        setNewUsuDialog(false)
        setModalChangeState(false)
        setDialogExport(false)
        setModalDocumentosUsuario(false)
        setModalChangePass(false)
        setDialogImport(false)
    }

    const header1 = renderHeader1();

    const formikUsuario = new FormikEmp()
    const empleadoFormik = formikUsuario.formikUsuario({setToatsEmpelado:setToatsEmpelado, hideModal:hideModal, reloadPage:()=>setReload(reload+1)})

    const [empleadoDialog, setEmpleadoDialog] = useState({});
    

    const [buttonsDialog, setButtonsDialog] = useState(false);

    useEffect(()=>{
        if(!empleadoDialog.id_empleado){
            setButtonsDialog(false)
        }else{
            setButtonsDialog(true)
        }
    }, [empleadoFormik.values]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleButtonSubmit = () =>{
        empleadoFormik.handleSubmit()
    }



    const confirm1 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: '¿Está seguro de restablecer la contraseña?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel:'Seguro!',
            accept:showModalChangePass,
        });
    };

    const dialogHeader = () =>{
        return (
            <div className='w-full grid justify-content-between'>
                <div className="mb-2 sm:mb-0 sm:col-6">
                    <Button onClick={confirm1}  tooltip="Restablecer Contraseña" icon="pi pi-unlock" className="p-button-rounded p-button-outlined mx-2" />
                </div>
                <div className='sm:col-6 flex justify-content-end'>
                    <div className={buttonsDialog?'block':'hidden'}>
                        <Button onClick={() => {empleadoFormik.setValues(empleadoDialog); setEmpleadoDialog({}) }} icon="pi pi-replay" className="p-button-rounded p-button-outlined mx-2" />
                        <Button type="button" onClick={handleButtonSubmit} icon="pi pi-check" className="p-button-rounded p-button-outlined mx-2" />
                    </div>
                    <div className="block">
                        <Button onClick={hideModal} icon="pi pi-times" className="p-button-rounded p-button-outlined mx-2" />
                    </div>
                </div>
            </div>
        )
    }

    const footerNewEmpleado = () =>{
        return <>
                <Button type="button" label='Crear' onClick={handleButtonSubmit} icon="pi pi-check" className="mx-2" />
                <Button label='Cancelar' type="button" onClick={hideModal} icon="pi pi-times" className="mx-2" />
        </>
    }

    const [newUsuDialog, setNewUsuDialog] = useState(false);

    const handleButtonChangeState = () =>{
        if(pageState){
            empleadoService.changeState(empleadoChangeState.id_empleado, 'inactivar').then(res=>{
                toast.current.show({ severity: 'warn', summary: 'Todo Bien', detail: `El usuario ${empleadoChangeState.nombres} a sido inactivado con exito`, life: 3000 });
                setReload(reload+1)
            })
        }else{
            empleadoService.changeState(empleadoChangeState.id_empleado, 'activar').then(res=>{
                toast.current.show({ severity: 'warn', summary: 'Todo Bien', detail: `El usuario ${empleadoChangeState.nombres} a sido activado con exito`, life: 3000 });
                setReload(reload+1)
            })
        }
        hideModal()
        setPageState(true)
    }

    const credencialService = new CredencialService()

    const handleButtonChangePass = () =>{
        credencialService.restorePass(empleadoDialog.id_empleado).then(res=>{
            toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 });
            hideModal()
        })
    }

    const footerChangeStateEmpleado = () =>{
        return <>
            <Button type="button" label='Aceptar' onClick={handleButtonChangeState} icon="pi pi-check" className="mx-2" />
            <Button label='Cancelar' type="button" onClick={hideModal} icon="pi pi-times" className="mx-2" />
        </>
    }
    const footerChangePass = () =>{
        return <>
            <Button type="button" label='Aceptar' onClick={handleButtonChangePass} icon="pi pi-check" className="mx-2" />
            <Button label='Cancelar' type="button" onClick={hideModal} icon="pi pi-times" className="mx-2" />
        </>
    }

    const changeModal = (mode) =>{
        if(mode===0){
            setModalUsuario(false)
            setModalDocumentosUsuario(true)
        }else if(mode===1){
            setModalUsuario(true)
            setModalDocumentosUsuario(false)
        }
    }

    return (
        <div className="datatable-filter-demo">
            <Toast ref={toast} position="bottom-right"/>
            <div className="card">
                {renderHeadTable()}
                {dataView === false &&
                    <DataTable value={empleados} paginator className="p-datatable-customers datatable-responsive" rows={5}
                        dataKey="id" rowsPerPageOptions={[5, 10, 25, 50, 100]} filters={filters1} filterDisplay="menu" loading={loading1} size="large" responsiveLayout="stack"
                        globalFilterFields={['nombres', 'empresa.nombre_empresa', 'lugar_trabajo.nombre_ciudad', 'centro_costo.nombre_centro_costo', 'numero_identificacion']} header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontraron Empleados" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
                        <Column body={e=>avatarTableBody(e)}/>
                        <Column field='nombres' header="Nombres" sortable filter filterPlaceholder="Buscar Por Nombre" />
                        <Column header="Empresa"  sortable field='empresa.nombre_empresa' filter filterPlaceholder="Buscar Por Empresa"/>
                        <Column header="Lugar Trabajo"  sortable field='lugar_trabajo.nombre_ciudad' filter filterPlaceholder="Buscar Por Lugar Trabajo"/>
                        <Column header="Centro Costo"  sortable field='centro_costo.nombre_centro_costo' filter filterPlaceholder="Buscar Por Centro Costo"/>
                        <Column header="Número Documento" sortable field='numero_identificacion' filter filterPlaceholder="Buscar Por Número Documento"/>
                        <Column header="Opciones" body={accionesBody}/>
                    </DataTable>
                }
                {dataView === true &&
                    <DataTable value={empleados} paginator className="p-datatable-customers datatable-responsive" rows={10}
                        dataKey="id" rowsPerPageOptions={[10, 25, 50, 100]} filters={filters1} size="small" filterDisplay="menu" loading={loading1} responsiveLayout="scroll"
                        globalFilterFields={['nombres', 'empresa.nombre_empresa', 'lugar_trabajo.nombre_ciudad', 'centro_costo.nombre_centro_costo', 'numero_identificacion']} header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontraron Empleados" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
                        <Column field='nombres' header="Nombres" sortable filter filterPlaceholder="Buscar Por Nombre" style={{ minWidth: '10rem'}} />
                        <Column header="Empresa" style={{ minWidth: '12rem' }} sortable field='empresa.nombre_empresa' filter filterPlaceholder="Buscar Por Empresa"/>
                        <Column header="Lugar Trabajo" style={{ minWidth: '12rem' }} sortable field='lugar_trabajo.nombre_ciudad' filter filterPlaceholder="Buscar Por Lugar Trabajo"/>
                        <Column header="Centro Costo" style={{ minWidth: '12rem' }} sortable field='centro_costo.nombre_centro_costo' filter filterPlaceholder="Buscar Por Centro Costo"/>
                        <Column header="Número Documento" style={{ minWidth: '10rem' }} sortable field='numero_identificacion' filter filterPlaceholder="Buscar Por Número Documento"/>
                        <Column header="Fecha Ingreso" style={{ minWidth: '10rem' }} sortable field='fecha_ingreso' filter filterPlaceholder="Buscar Por Fecha Ingreso"/>
                        <Column header="Opciones" style={{ minWidth: '8rem' }} body={accionesBody}/>
                    </DataTable>
                }
                <Dialog draggable={false} position='center' blockScroll={true} visible={modalDocumentosUsuario} style={{ width: '55vw' }} breakpoints={{'1150px': '75vw', '960px': '80vw', '850px': '90vw', '760px':'97vw','700px': '100vw'}} onHide={hideModal}>
                    <Documentos idUsuario={idUsuario} changeModal={changeModal} toast={toast}/>
                </Dialog>
                <Dialog header={dialogHeader} closable={false} draggable={false} position='center' blockScroll={true} visible={modalUsuario} style={{ width: '55vw' }} breakpoints={{'1150px': '75vw', '960px': '80vw', '850px': '90vw', '760px':'97vw','700px': '100vw'}} onHide={hideModal}>
                    <Usuario changeModal={changeModal} idUsuario={idUsuario} formik={empleadoFormik} empleadoDialog={empleadoDialog} setEmpleadoDialog={setEmpleadoDialog}/>
                </Dialog>
                <Dialog header='Nuevo Empleado' footer={footerNewEmpleado} draggable={false} position='center' blockScroll={true} visible={newUsuDialog} style={{ width: '40vw' }} breakpoints={{'1150px': '55vw', '960px': '75vw', '640px': '100vw'}} onHide={hideModal}>
                    <NewUsuario formik={empleadoFormik} />
                </Dialog>
                <Dialog header='Cargar Archivo' draggable={false} position='center' blockScroll={true} visible={dialogImport} style={{ width: '40vw' }} breakpoints={{'1150px': '55vw', '960px': '75vw', '640px': '100vw'}} onHide={hideModal}>
                    <CargarArchivo toast={toast} hideModal={hideModal}/>
                </Dialog>
                <Dialog header='Generar Reporte' draggable={false} position='center' blockScroll={true} visible={dialogExport} style={{ width: '40vw' }} breakpoints={{'1150px': '55vw', '960px': '75vw', '640px': '100vw'}} onHide={hideModal}>
                    <GenerarReporte toast={toast} hideModal={hideModal}/>
                </Dialog>
                <Dialog header='Cambiar Estado Del Empleado' closable={false} footer={footerChangeStateEmpleado} draggable={false} position='center' blockScroll={true} visible={modalChangeState} style={{ width: '35vw' }} breakpoints={{'1150px': '45vw', '960px': '65vw', '640px': '100vw'}} onHide={hideModal}>
                    <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                        <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                        <span>¿Está seguro de cambiar el estado a <b>{empleadoChangeState.nombres}</b>?</span>
                    </div>
                </Dialog>
                <Dialog  footer={footerChangePass} closable={false} draggable={false} position='bottom' blockScroll={true} visible={modalChangePass} style={{ width: '35vw' }} breakpoints={{'1150px': '40vw', '960px': '60vw', '640px': '100vw'}} onHide={hideModal}>
                    <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                        <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                        <div>Está Apunto de restablecer la contraseña de {empleadoDialog.nombres}</div>
                    </div>
                </Dialog>
            </div>
            <ConfirmPopup/>
        </div>
    );
}
                 
export default Empleados