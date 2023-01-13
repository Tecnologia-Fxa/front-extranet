import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { EmpleadoService } from '../../../services/EmpleadoService';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
const Permisos = () => {

    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const toast = useRef(null);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            });
        setGlobalFilterValue1('');
    }

    const [empleados, setEmpleados] = useState([])
    const [statePage, setStatePage] = useState(0)

    const empleadoService = new EmpleadoService()
    useEffect(() => {
        empleadoService.getEmpleadosPermisos().then(res=>{
            setEmpleados(res.data)
            setLoading1(false)
            setGlobalFilterValue1('')
        })
        initFilters1();
    }, [statePage]);// eslint-disable-line 
    



    const tipoUsuarioField = (rowData) =>{
        if(rowData.tipo_usuario_fk===1){
            return <Button tooltip='Soporte' onClick={()=>showModal(rowData)} className='p-button-rounded p-button-text' icon='pi pi-star'/>
        }else if(rowData.tipo_usuario_fk===2){
            return <Button tooltip='Admin' onClick={()=>showModal(rowData)} className='p-button-rounded p-button-text' icon='pi pi-briefcase'/>
        }else{
            return <Button tooltip='Empleado' onClick={()=>showModal(rowData)} className='p-button-rounded p-button-text' icon='pi pi-user'/>
        }
    }

    const header1 = () => {
        return (
            <div className=" grid">
                <div className='col-12 xl:col-9 lg:col-8 md:col-8 sm:col-7'>
                    <h4>Gestion De Permisos:</h4>
                    
                </div>
                <div className='col-12 xl:col-3 lg:col-4 md:col-4 sm:col-5'>
                    <span className="p-input-icon-left mb-2">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar" />
                        </span>
                </div>
            </div>
        )
    }

    const [modalChangeRol, setModalChangeRol] = useState(false)

    const hideModal = () =>{
        setModalChangeRol(false)
    }

    const [empleadoData, setEmpleadoData] = useState({})

    const showModal = (data) =>{
        setModalChangeRol(true)
        setEmpleadoData(data)
    }

    const textRol = (idRol) =>{
        if(idRol===1){
            return 'Soporte'
        }else if(idRol===2){
            return 'Admin'
        }else{
            return 'Empleado'
        }
    }

    const handleChangeRol = (idRol) =>{
        empleadoService.updateRol(empleadoData.id_empleado,idRol).then(res=>{
            toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Se a asignado el rol ${textRol(idRol)} al usuario ${empleadoData.nombres}`, life: 3000 })
            hideModal()
            setStatePage(statePage+1)
        })
    }

    const accept = (rol) => {
        handleChangeRol(rol)    
    }

    const reject = () => {
        hideModal()
    }

    const confirm = (rol) => {
        confirmDialog({
            message: 'Una vez cambiado el rol, el usuario tendra o perdera permisos previamente asignados',
            header: 'Está seguro de realizar esta acción?',
            icon: 'pi pi-exclamation-triangle',
            accept:()=>accept(rol),
            acceptLabel:'Seguro!',
            reject
        });
    };

    const buttonsRol = () =>{
        return <div className='flex w-full justify-content-between my-3'>
            <Button onClick={()=>confirm(1)} disabled={(empleadoData.tipo_usuario_fk === 1)?true:false}  className={(empleadoData.tipo_usuario_fk === 1)?'':'p-button-text'} label='Soporte' icon='pi pi-star'/>
            <Button onClick={()=>confirm(2)} disabled={(empleadoData.tipo_usuario_fk === 2)?true:false} className={(empleadoData.tipo_usuario_fk === 2)?'':'p-button-text'} label='Admin' icon='pi pi-briefcase'/>
            <Button onClick={()=>confirm(3)} disabled={(empleadoData.tipo_usuario_fk === 3)?true:false} className={(empleadoData.tipo_usuario_fk === 3)?'':'p-button-text'} label='Empleado' icon='pi pi-user'/>
        </div>
    }

  return <div className='card'>
        <Toast ref={toast} position="bottom-right"/>
        <DataTable  value={empleados} paginator className="p-datatable-customers" rows={25}
        dataKey="id" filters={filters1} rowsPerPageOptions={[25, 50, 100, 200]} size="small" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" 
        globalFilterFields={['nombres', 'numero_identificacion']} header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontraron Empleados" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
            <Column filter showFilterMenu={false} field='nombres' header="Nombres" sortable style={{ minWidth: '10rem'}} />
            <Column filter showFilterMenu={false} header="Identificacion" style={{ minWidth: '12rem' }} sortable field='numero_identificacion'/>
            <Column bodyStyle={{ textAlign: 'center' }} headerStyle={{ textAlign: 'center'  }} header="Tipo usuario" style={{ minWidth: '8rem' }} body={tipoUsuarioField} />
        </DataTable>
        <Dialog header='Cambiar Rol Del Usuario' draggable={false} position='center' blockScroll={true} visible={modalChangeRol} style={{ width: '35vw' }} breakpoints={{'1150px': '45vw', '960px': '65vw', '640px': '100vw'}} onHide={hideModal}>
            {buttonsRol()}
        </Dialog>
        <ConfirmDialog/>
  </div>;
};

export default Permisos;
