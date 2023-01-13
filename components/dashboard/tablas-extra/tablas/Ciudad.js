import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import classNames from 'classnames';
import { Toast } from 'primereact/toast';
import DefaultFormik from './DefaultFormik';

const Ciudad = (props) => {
   
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

    const ItemService  = require(`../../../../services/DefaultService`);
    const itemService = ItemService.default(props.model||props.nombre)
    const service = new itemService()

    const [estadoPagina, setEstadoPagina] = useState(false)

    useEffect(() => {
        if(!props.data[0] || estadoPagina === true){
            service.getTableData().then(res=>{
                props.setData(res.data)
                setData(res.data)
                setLoading1(false)
                setEstadoPagina(false)
            })
        }else{
            setData(props.data)
            setLoading1(false)
        }

        initFilters1();
    }, [estadoPagina]); //eslint-disable-line
    
    const header1 = () => {
        return (
            <div className="grid">
                <div className='col-12 xl:col-9 lg:col-8 md:col-8 sm:col-7'>
                    <h5 className='inline-block mx-4'>{props.name}</h5>
                    <Button id='nuevoRegistroButton' onClick={(e) => op.current.toggle(e)} tooltip={'Nuevo Registro'} className="p-button-text p-button-rounded p-button-outlined mb-3 inline-block"><i className='pi pi-plus'/></Button>
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
        let newDataArray = Object.values(newData)
        if(!/^[A-Za-zá-ýÁ-Ý ._-]+$/.test(newDataArray[1])){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nombre es obligatorio, ademas solo permite letras y espacios', life: 3000 })
        }else if(!(newDataArray[1].length >= props.minMax[0] && newDataArray[1].length <= props.minMax[1])){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: `El nombre debe tener de ${props.minMax[0]} a ${props.minMax[1]} caracteres`, life: 3000 })
        }else{
            service.update(newDataArray[0], {nombre:newDataArray[1]}).then(res=>{
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
        service.delete(id).then(res=>{
            props.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Registro borrado con exito`, life: 4000 })
            setEstadoPagina(true)
        })
    }

    const eliminarData = (rowData) =>{
        if(rowData.empleados_lugar_nacimiento > 0 || rowData.empleados_lugar_trabajo > 0 || rowData.empleados_lugar_exp_doc > 0 || rowData.lugar_centros_costo > 0){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: `No se puede borrar una ${props.name} que ya tiene rejistros relacionados`, life: 4000 })
        }else{
            rowData = Object.values(rowData)
            confirmDialog({
            header: '¿Está seguro de realizar esta acción?',
            accept:()=>borrarEmpresa(rowData[0]),
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
        op.current.hide()
    }

    const formikEmpresa = new DefaultFormik()
    const formik = formikEmpresa.formik({setShowToast:setShowToast, reload:reload, cloceOverlayNew:cloceOverlayNew, minMax:props.minMax, name:props.model||props.nombre})

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return <div>
        <Toast ref={toast} position="bottom-right"/>
       <DataTable selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} editMode="row" onRowEditComplete={confirm1} value={data} paginator className="p-datatable-customers" rows={10}
        dataKey="id" filters={filters1} rowsPerPageOptions={[10, 25, 50, 100, 200]} size="small" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" 
        header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontro información" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
            <Column filter editor={(options) => textEditor(options)} showFilterMenu={false} field={`nombre_${props.nombre}`} header="Nombre" sortable/>
            <Column filter showFilterMenu={false} header="Lugar Nacimiento" sortable field='empleados_lugar_nacimiento'/>
            <Column filter showFilterMenu={false} header="Lugar Trabajo" sortable field='empleados_lugar_trabajo'/>
            <Column filter showFilterMenu={false} header="Lugar Expedicion Documento" sortable field='empleados_lugar_exp_doc'/>
            <Column filter showFilterMenu={false} header="Centros Costo" sortable field='lugar_centros_costo'/>
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '5rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column body={bodyEliminar} editor={bodyEliminarD} headerStyle={{ width: '10%', minWidth: '2rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>

        <OverlayPanel ref={op} onHide={formik.resetForm} showCloseIcon id="overlay_panel" style={{ width: '250px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} breakpoints={{'640px': '90vw'}}>
            <div className='w-full text-center'>
                <h5>Nuevo Registro</h5>
            </div>
                <div className="col-12 mt-5">
                    <span className="p-float-label">
                        <InputText name={`nombre`} type="text"  className={classNames({ 'p-invalid': isFormFieldValid(`nombre`) })+' w-full'}  value={formik.values.nombre} onChange={formik.handleChange}></InputText> 
                        <label>Nombre {props.name}:</label>
                    </span>
                    <div>{getFormErrorMessage(`nombre`)}</div>
                </div>
                <Button type='button' onClick={formik.handleSubmit} label='Guardar' className='mt-2 w-full'/>
        </OverlayPanel>
        <ConfirmDialog />
    </div>;
};

export default Ciudad;
