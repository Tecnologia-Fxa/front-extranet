import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import classNames from 'classnames';
import EmpresaFormik from './EmpresaFormik';
import { Toast } from 'primereact/toast';
import EmpresaService from '../../../../services/EmpresaService';

const Empresa = (props) => {

    const toast = useRef(null);

    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const op = useRef(null);
    const [data, setData] = useState([])

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
            });
        setGlobalFilterValue1('');
    }

    /* const empresaService = new empresaService() */
    const empresaService = new EmpresaService()

    const [estadoPagina, setEstadoPagina] = useState(false)

    useEffect(() => {
        if(!props.empresa[0] || estadoPagina === true){
            empresaService.getTableData().then(res=>{
                props.setEmpresa(res.data)
                setData(res.data)
                setLoading1(false)
                setEstadoPagina(false)
            })
        }else{
            setData(props.empresa)
            setLoading1(false)
        }

        initFilters1();
    }, [estadoPagina]); //eslint-disable-line
    
    const header1 = () => {
        return (
            <div className="grid">
                <div className='col-12 xl:col-9 lg:col-8 md:col-8 sm:col-7'>
                    <h5 className='inline-block mx-4'>Empresa</h5>
                    <Button onClick={(e) => op.current.toggle(e)} tooltip='Nueva Empresa' className="p-button-text p-button-rounded p-button-outlined mb-3 inline-block"><i className='pi pi-plus'/></Button>
                </div>
                <div className='col-12 xl:col-3 lg:col-4 md:col-4 sm:col-5'>
                    <span className="p-input-icon-left mb-2 w-full">
                        <i className="pi pi-search" />
                        <InputText className=' w-full' value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar" />
                    </span>
                </div>
            </div>
        )
    }

    const onRowEditComplete1 = (e) => {
        let { newData } = e

        if(!/^[A-Za-zá-ýÁ-Ý ._-]+$/.test(newData.nombre_empresa)){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nombre es obligatorio, ademas solo permite letras y espacios', life: 3000 })
        }else if(!(newData.nombre_empresa.length >= 4 && newData.nombre_empresa.length <= 50)){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nombre debe tener de 4 a 50 caracteres', life: 3000 })
        }else if(!/^[\d-]+$/.test(newData.nit)){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nit solo acepta números y .-_', life: 3000 })
        }else if(!(newData.nit.length >= 6 && newData.nit.length <= 15)){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nombre debe tener de 6 a 15 caracteres', life: 3000 })
        }else{
            empresaService.updateEmpresa(newData.id_empresa, newData).then(res=>{
                if(res.status===201){
                    props.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 })
                }else{
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 })
                }
                setEstadoPagina(true)
            }) 
        }
    }
    
    const confirm1 = (e) => {
        confirmDialog({
            header: '¿Está seguro de realizar esta acción?',
            accept:()=>onRowEditComplete1(e),
            acceptLabel:'Seguro!'
        });
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }


    const borrarEmpresa = (id) =>{
        empresaService.deleteEmpresa(id).then(res=>{
            props.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: "Empresa borrada con exito", life: 4000 })
            setEstadoPagina(true)
        })
    }

    const eliminarData = (rowData) =>{
        if(rowData.empleados > 0){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: "No se puede borrar una empresa que ya tiene empleados relacionados", life: 4000 })
        }else{
            confirmDialog({
            header: '¿Está seguro de realizar esta acción?',
            accept:()=>borrarEmpresa(rowData.id_empresa),
            acceptLabel:'Seguro!'
            })
        }
    }

    const bodyEliminar = (rowData) =>{
        return (
            <Button onClick={()=>eliminarData(rowData)} className='p-button-secondary p-button-text p-button-rounded' icon='pi pi-trash'/>
        )
    }
    const bodyEliminarD = (rowData) =>{
        return (
            <Button disabled className='p-button-secondary p-button-text p-button-rounded' icon='pi pi-trash'/>
        )
    }

    const [showToast, setShowToast] = useState({});

    useEffect(()=>{
        if(showToast.severity){
            toast.current.show(showToast);
        }
    },[showToast])

    const reload = () =>{
        setEstadoPagina(true)
    }

    const cloceOverlayNew = () =>{
        op.current.toggle(false)
    }

    const formikEmpresa = new EmpresaFormik()
    const formik = formikEmpresa.formik({setShowToast:setShowToast, reload:reload, cloceOverlayNew:cloceOverlayNew})

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return <div>
        <Toast ref={toast} position="bottom-right"/>
       <DataTable selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} editMode="row" onRowEditComplete={confirm1} value={data} paginator className="p-datatable-customers" rows={10}
        dataKey="id" filters={filters1} rowsPerPageOptions={[10, 25, 50, 100, 200]} size="small" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" 
        globalFilterFields={['nombre_empresa', 'nit', 'empleados']} header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontro información" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
            <Column filter editor={(options) => textEditor(options)} showFilterMenu={false} field='nombre_empresa' header="Nombre" sortable/>
            <Column filter editor={(options) => textEditor(options)} showFilterMenu={false} field='nit' header="Nit" sortable/>
            <Column filter showFilterMenu={false} header="Empleados" sortable field='empleados'/>
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '5rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column body={bodyEliminar} editor={bodyEliminarD} headerStyle={{ width: '10%', minWidth: '2rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>

        <OverlayPanel ref={op} onHide={formik.resetForm} showCloseIcon id="overlay_panel" style={{ width: '250px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} breakpoints={{'640px': '90vw'}}>
            <div className='w-full text-center'>
                <h5>Nueva Empresa</h5>
            </div>
                <div className="col-12 mt-5">
                    <span className="p-float-label">
                        <InputText name='nombre_empresa' type="text"  className={classNames({ 'p-invalid': isFormFieldValid('nombre_empresa') })+' w-full'}  value={formik.values.nombre_empresa} onChange={formik.handleChange}></InputText> 
                        <label>Nombre Empresa:</label>
                    </span>
                    <div>{getFormErrorMessage('nombre_empresa')}</div>
                </div>
                <div className="col-12 mt-5">
                    <span className="p-float-label">
                        <InputText name='nit' type="text"  className={classNames({ 'p-invalid': isFormFieldValid('nit') })+' w-full'}  value={formik.values.nit} onChange={formik.handleChange}></InputText> 
                        <label>Nit:</label>
                    </span>
                    <div>{getFormErrorMessage('nit')}</div>
                </div>
                
                <Button onClick={formik.handleSubmit} label='Guardar' className='mt-2 w-full'/>
        </OverlayPanel>
    </div>;
};

export default Empresa;
