import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import CentroCostoService from '../../../../services/CentroCostoService';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import classNames from 'classnames';
import CentroCostoFormik from './CentroCostoFormik';
import { Toast } from 'primereact/toast';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';

const CentroCosto = (props) => {

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

    const centroCostoService = new CentroCostoService()
    
    const [estadoPagina, setEstadoPagina] = useState(false)

    useEffect(() => {
        if(!props.centroCosto[0] || estadoPagina === true){
            centroCostoService.getTableData().then(res=>{
                props.setCentroCosto(res.data)
                setData(res.data)
                setLoading1(false)
                setEstadoPagina(false)
            })
        }else{
            setData(props.centroCosto)
            setLoading1(false)
        }

        initFilters1();
    }, [estadoPagina]); //eslint-disable-line
    
    const header1 = () => {
        return (
            <div className="grid">
                <div className='col-12 xl:col-9 lg:col-8 md:col-8 sm:col-7'>
                    <h5 className='inline-block mx-4'>Centro De Costo</h5>
                    <Button onClick={(e) => op.current.toggle(e)} tooltip='Nuevo Centro De costo' className="p-button-text p-button-rounded p-button-outlined mb-3 inline-block"><i className='pi pi-plus'/></Button>
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

        if(!/^[A-Za-zá-ýÁ-Ý ]+$/.test(newData.nombre_centro_costo)){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nombre es obligatorio, ademas solo permite letras y espacios', life: 3000 })
        }else if(!(newData.nombre_centro_costo.length >= 3 && newData.nombre_centro_costo.length <= 25)){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: 'El nombre debe tener de 3 a 25 caracteres', life: 3000 })
        }else{
            centroCostoService.updateCentroCosto(newData.id_centro_costo, newData).then(res=>{
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

    
    const selectCiudad = (options) =>{
        return <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('id_ciudad_fk') })+' w-full'} name='id_ciudad_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={options.rowData.id_ciudad_fk} onChange={(e) => options.editorCallback(e.value)}/>
    }


    const borrarCentro = (id) =>{
        centroCostoService.deleteCentroCosto(id).then(res=>{
            props.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: "Centro de costo borrado con exito", life: 4000 })
            setEstadoPagina(true)
        })
    }

    const eliminarData = (rowData) =>{
        if(rowData.empleados > 0){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: "No se puede borrar un centro de costo que ya tiene empleados relacionados", life: 4000 })
        }else{
            confirmDialog({
                header: '¿Está seguro de realizar esta acción?',
                accept:()=>borrarCentro(rowData.id_centro_costo),
                acceptLabel:'Seguro!'
            })
        }
    }

    const bodyEliminar = (rowData) =>{
        return (
            <Button onClick={()=>eliminarData(rowData)} className='p-button-secondary p-button-text p-button-rounded' icon='pi pi-trash'/>
        )
    }

    const bodyEliminarD = () =>{
        return (
            <Button disabled className='p-button-secondary p-button-text p-button-rounded' icon='pi pi-trash'/>
        )
    }

    const [toatsEmpelado, setToatsEmpelado] = useState({});

    useEffect(()=>{
        if(toatsEmpelado.severity){
            toast.current.show(toatsEmpelado);
        }
    },[toatsEmpelado])

    const reload = () =>{
        setEstadoPagina(true)
    }

    const cloceOverlayNew = () =>{
        op.current.toggle(false)
    }

    const formikCentroCosto = new CentroCostoFormik()
    const formik = formikCentroCosto.formik({setToatsEmpelado:setToatsEmpelado, reload:reload, cloceOverlayNew:cloceOverlayNew})

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return <div>
       <Toast ref={toast} position="bottom-right"/>
       <DataTable selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} editMode="row" onRowEditComplete={confirm1} value={data} paginator className="p-datatable-customers" rows={10}
        dataKey="id" filters={filters1} rowsPerPageOptions={[10, 25, 50, 100, 200]} size="small" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" 
        globalFilterFields={['nombre_centro_costo', 'empleados']} header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontro información" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
            <Column filter editor={options => textEditor(options)} showFilterMenu={false} field='nombre_centro_costo' header="Nombre" sortable/>
            <Column filter editor={options=>selectCiudad(options)} showFilterMenu={false} header="Ciudad" style={{ minWidth: '5rem' }} sortable field='id_ciudad_fk' body={e=>e.nombre_ciudad}/>
            <Column filter showFilterMenu={false} header="Empleados" style={{ minWidth: '5rem' }} sortable field='empleados'/>
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '5rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column body={bodyEliminar} editor={bodyEliminarD} headerStyle={{ width: '10%', minWidth: '2rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>

        <OverlayPanel ref={op} onHide={formik.resetForm} showCloseIcon id="overlay_panel" style={{ width: '250px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} breakpoints={{'640px': '90vw'}}>
            <div className='w-full text-center'>
                <h5>Nuevo Centro De Costo</h5>
            </div>
                <div className="col-12 mt-5">
                    <span className="p-float-label">
                        <InputText name='nombre_centro_costo' type="text"  className={classNames({ 'p-invalid': isFormFieldValid('nombre_centro_costo') })+' w-full'}  value={formik.values.nombre_centro_costo} onChange={formik.handleChange}></InputText> 
                        <label>Nombre Centro Costo:</label>
                    </span>
                    <div>{getFormErrorMessage('nombre_centro_costo')}</div>
                </div>
                <div className="col-12 mt-5">
                    <span className="p-float-label">
                        <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('id_ciudad_fk') })+' w-full'} name='id_ciudad_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={formik.values.id_ciudad_fk} onChange={formik.handleChange}/>
                        <label>Ciudad:</label>
                    </span>
                    <div>{getFormErrorMessage('id_ciudad_fk')}</div>
                </div>
                <Button onClick={formik.handleSubmit} type='button' label='Guardar' className='mt-2 w-full'/>
        </OverlayPanel>

        <ConfirmDialog />
    </div>;
};

export default CentroCosto;
